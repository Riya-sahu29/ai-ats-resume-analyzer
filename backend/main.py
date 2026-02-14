from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2

from resume_ai import analyze_resume_with_ai

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "AI ATS Resume Analyzer Running"}

@app.post("/analyze-resume/")
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    # Validate file type
    if not file.filename.endswith(".pdf"):
        return {"error": "Only PDF resumes allowed"}

    # Read PDF
    try:
        reader = PyPDF2.PdfReader(file.file)
    except:
        return {"error": "Invalid or corrupted PDF"}

    resume_text = ""
    for page in reader.pages:
        extracted = page.extract_text()
        if extracted:
            resume_text += extracted

    # Validate resume text
    if len(resume_text.strip()) < 100:
        return {"error": "Resume text too short or unreadable"}

    # Validate job description
    if len(job_description.strip()) < 20:
        return {"error": "Job description is required"}

    # Call AI Analyzer
    result = analyze_resume_with_ai(resume_text, job_description)

    return result

# Software Development experience with python, Flask, APIs, database, and backend system.