from groq import Groq
import os
import json
import re
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY")) 

def analyze_resume_with_ai(resume_text, job_text):
 
    if len(resume_text.strip()) < 100:
        return {"error": "Resume text too short or unreadable"}

    if len(job_text.strip()) < 20:
        return {"error": "Job description is required"}

    prompt = f"""
You are a professional ATS (Applicant Tracking System).

Rules:
- ats_score must be in percentage (0 to 100)
- Do Not return decimals like 0.8
- Calculate ATS score based on:
  1. Skill match percentage
  2. keyword relevance
  3. Experience alignment
- Be strict and realistic (do NOT give high score easily)

Return ONLY valid JSON in this format:

{{
   "ats_score": number,
   "strengths": [list],
   "weaknesses": [list],
   "missing_skills": [list],
   "improvement_tips": [list],
   "verdict": "Hire | Maybe | Reject"
}}

RESUME:
{resume_text}

JOB DESCRIPTION:
{job_text}
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "Return ONLY valid JSON. No extra text."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=700
        )

        raw_output = response.choices[0].message.content.strip()
        print("\nRaw AI OUTPUT:\n", raw_output)

        import re
        match = re.search(r"\{.*\}", raw_output, re.DOTALL) 

        if not match:
            return {"error": "AI returned no valid JSON", "raw": raw_output}

        parsed = json.loads(match.group())

        #fix ATS score format
        ats_score = parsed.get("ats_score")
        if isinstance(ats_score, float) and ats_score <= 1:
            parsed["ats_score"] = int(ats_score * 100)

        return parsed

    except Exception as e:
        return {"error": f"AI request failed: {str(e)}"}                     
