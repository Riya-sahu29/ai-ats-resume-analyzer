import asyncio
import httpx
import json
import re
import logging
import os
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL   = "llama-3.1-8b-instant"   # your original model — kept the same
GROQ_TIMEOUT = 45                        # seconds before giving up
MAX_RETRIES  = 3                         # retry this many times on failure

# ── Prompt — kept your exact JSON structure ────────────────────────────────────
PROMPT_TEMPLATE = """
You are a professional ATS (Applicant Tracking System).

Rules:
- ats_score must be in percentage (0 to 100)
- Do NOT return decimals like 0.8
- Calculate ATS score based on:
  1. Skill match percentage
  2. Keyword relevance
  3. Experience alignment
- Be strict and realistic (do NOT give high scores easily)

Return ONLY valid JSON in this exact format — no extra text, no markdown:

{{
   "ats_score": number,
   "strengths": [list of strings],
   "weaknesses": [list of strings],
   "missing_skills": [list of strings],
   "improvement_tips": [list of strings],
   "verdict": "Hire | Maybe | Reject"
}}

RESUME:
{resume_text}

JOB DESCRIPTION:
{job_text}
"""


# ── Public async function ──────────────────────────────────────────────────────
async def analyze_resume_with_ai(resume_text: str, job_text: str) -> dict:
    """
    FIX 1: Now fully async — does not block FastAPI event loop.
    FIX 2: Has a 45s timeout — will not hang forever on mobile.
    FIX 3: Retries 3 times before giving up.
    FIX 4: Always returns valid dict — never returns None or crashes silently.
    """
    prompt = PROMPT_TEMPLATE.format(
        resume_text=resume_text[:4000],   # cap to avoid token overflow
        job_text=job_text[:2000],
    )

    last_error = "Unknown error"

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            logger.info(f"🤖 Groq attempt {attempt}/{MAX_RETRIES}")
            result = await _call_groq(prompt)
            logger.info(f"✅ Groq succeeded on attempt {attempt}")
            return result

        except asyncio.TimeoutError:
            last_error = f"Groq API timed out after {GROQ_TIMEOUT}s"
            logger.warning(f"⏰ Attempt {attempt} timed out")

        except httpx.HTTPStatusError as e:
            status = e.response.status_code
            if status == 429:
                wait = 2 ** attempt    # 2s, 4s, 8s ...
                logger.warning(f"🔴 Rate limited by Groq. Waiting {wait}s...")
                await asyncio.sleep(wait)
                last_error = "Groq rate limit hit"
            else:
                last_error = f"Groq HTTP error {status}"
                logger.error(f"HTTP {status} on attempt {attempt}: {e}")

        except Exception as e:
            last_error = str(e)
            logger.error(f"Attempt {attempt} unexpected error: {e}")

        # Brief pause before next retry (skip on last attempt)
        if attempt < MAX_RETRIES:
            await asyncio.sleep(1.5)

    # ── All retries exhausted ──────────────────────────────────────────────────
    logger.error(f"❌ All Groq retries failed. Last error: {last_error}")
    return _fallback_response(last_error)


# ── Internal: single Groq call ─────────────────────────────────────────────────
async def _call_groq(prompt: str) -> dict:
    """
    FIX: Uses httpx async client instead of the sync groq SDK.
    The groq Python SDK is synchronous and would block FastAPI.
    httpx is the correct async HTTP client to use here.
    """
    async with httpx.AsyncClient(timeout=GROQ_TIMEOUT) as client:
        response = await client.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": GROQ_MODEL,
                "messages": [
                    {
                        "role": "system",
                        "content": "Return ONLY valid JSON. No extra text. No markdown."
                    },
                    {"role": "user", "content": prompt},
                ],
                "temperature": 0.3,
                "max_tokens": 700,
            },
        )
        response.raise_for_status()
        raw_output = response.json()["choices"][0]["message"]["content"].strip()
        logger.info(f"Raw AI output (first 200 chars): {raw_output[:200]}")
        return _parse_json_safe(raw_output)


# ── Internal: JSON parsing ─────────────────────────────────────────────────────
def _parse_json_safe(raw_output: str) -> dict:
    """
    Safely parse JSON from Groq.
    Handles markdown code fences (```json ... ```) if Groq adds them.
    Falls back to regex extraction like your original code.
    """
    # Strip markdown code fences if present
    if raw_output.startswith("```"):
        lines = raw_output.split("\n")
        raw_output = "\n".join(lines[1:-1])

    # Try direct parse first
    try:
        parsed = json.loads(raw_output)
        return _fix_ats_score(parsed)
    except json.JSONDecodeError:
        pass

    # Fallback: extract JSON block with regex (your original approach)
    match = re.search(r"\{.*\}", raw_output, re.DOTALL)
    if match:
        try:
            parsed = json.loads(match.group())
            return _fix_ats_score(parsed)
        except json.JSONDecodeError:
            pass

    logger.error(f"Could not parse JSON from: {raw_output[:300]}")
    return _fallback_response("AI returned invalid JSON format")


def _fix_ats_score(parsed: dict) -> dict:
    """Your original fix — convert decimal scores like 0.8 → 80."""
    ats_score = parsed.get("ats_score")
    if isinstance(ats_score, float) and ats_score <= 1.0:
        parsed["ats_score"] = int(ats_score * 100)
    elif isinstance(ats_score, float):
        parsed["ats_score"] = int(ats_score)
    return parsed


def _fallback_response(error_msg: str) -> dict:
    """
    Safe fallback when AI completely fails.
    Returns your EXACT JSON structure so frontend never breaks.
    """
    return {
        "ats_score": 0,
        "strengths": [],
        "weaknesses": [],
        "missing_skills": [],
        "improvement_tips": ["Analysis could not be completed. Please try again."],
        "verdict": "Error",
        "error": f"Analysis failed: {error_msg}",
    }