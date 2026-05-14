import logging
import asyncio
import uuid

from fastapi import FastAPI, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from resume_ai import analyze_resume_with_ai
from chatbot import chat_with_ai
from utils import extract_text_from_pdf
from cache import make_cache_key, get_cached_result, set_cached_result
from database import save_resume_data

# ── Logging setup ──────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

# ── Rate limiter ───────────────────────────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address)

# ── App ────────────────────────────────────────────────────────────────────────
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://ai-ats-resume-analyzer-xi.vercel.app",
    ]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Schema — kept same as your original ───────────────────────────────────────
class ChatRequest(BaseModel):
    user_id: str
    message: str
    resume_context: str = None


# ── Routes ─────────────────────────────────────────────────────────────────────

@app.get("/")
async def home():
    return {"status": "AI ATS Resume Analyzer Running"}


@app.post("/analyze-resume/")
@limiter.limit("10/minute")
async def analyze_resume(
    request: Request,
    file: UploadFile = File(...),
    job_description: str = Form(...),
):
    # ── Validate file type ─────────────────────────────────────────────────────
    if not file.filename.lower().endswith(".pdf"):
        return JSONResponse(status_code=400, content={"error": "Only PDF resumes allowed"})

    # ── Read file bytes ────────────────────────────────────────────────────────
    content = await file.read()

    if len(content) > 5 * 1024 * 1024:   # 5MB limit
        return JSONResponse(status_code=400, content={"error": "File too large. Max 5MB allowed."})

    # ── Validate job description ───────────────────────────────────────────────
    if len(job_description.strip()) < 20:
        return JSONResponse(status_code=400, content={"error": "Job description is too short"})

    # ── Extract PDF text (non-blocking — runs in thread pool) ─────────────────
    # FIX: PyPDF2 was blocking your async event loop — this moves it to a thread
    try:
        resume_text = await extract_text_from_pdf(content)
    except ValueError as e:
        return JSONResponse(status_code=422, content={"error": str(e)})

    # ── Validate resume text length ────────────────────────────────────────────
    if len(resume_text.strip()) < 100:
        return JSONResponse(
            status_code=422,
            content={"error": "Resume text too short or unreadable. Use a text-based PDF, not a scanned image."}
        )

    # ── Check Redis cache first ────────────────────────────────────────────────
    cache_key = make_cache_key(resume_text, job_description)
    cached = await get_cached_result(cache_key)
    if cached:
        logger.info("⚡ Returning cached result")
        cached["from_cache"] = True
        return JSONResponse(cached)

    # ── Call AI (async, with timeout + retry) ─────────────────────────────────
    logger.info("🚀 Starting Groq analysis...")
    result = await analyze_resume_with_ai(resume_text, job_description)

    # ── Generate session for chatbot ───────────────────────────────────────────
    session_id = str(uuid.uuid4())
    result["session_id"] = session_id
    result["from_cache"] = False

    # ── Save to cache + DB in background (does not block response) ─────────────
    asyncio.create_task(set_cached_result(cache_key, result))
    asyncio.create_task(save_resume_data(resume_text, result, session_id))

    return JSONResponse(result)


@app.post("/chat")
@limiter.limit("30/minute")
async def chat(request: Request, req: ChatRequest):   # FIX: now async
    if not req.message.strip():
        return JSONResponse(status_code=400, content={"error": "Message cannot be empty"})

    reply = await chat_with_ai(
        req.user_id,
        req.message,
        req.resume_context or "",
    )
    return {"reply": reply}


# ── Global error handler — never fail silently ─────────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"error": "Something went wrong on the server. Please try again."},
    )
