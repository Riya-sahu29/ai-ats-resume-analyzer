# AI ATS Resume Analyzer

An AI-powered Resume Analyzer that evaluates resumes based on ATS (Applicant Tracking System) standards and job descriptions.

Built using FastAPI, React, TailwindCSS, and Groq LLM.

## Features

• ATS Score calculation (0–100)  
• Strengths and Weakness analysis  
• Missing Skills detection  
• Improvement tips  
• Hiring verdict (Hire / Maybe / Reject)  
• Resume vs Job Description matching  
• Modern React + Tailwind UI  
• FastAPI backend with Groq AI  

---

## Tech Stack

Frontend:
• React.js  
• TailwindCSS  
• Axios  

Backend:
• FastAPI  
• Python  
• Groq API (LLM)
• PyPDF2  

---

## Project Structure

ai-ats-resume-analyzer/
│
├── backend/
│ ├── main.py
│ ├── resume_ai.py
│ ├── requirements.txt
│
├── frontend/
│ ├── src/
│ ├── components/
│ ├── pages/
│
└── README.md

## Installation

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
Frontend
cd resume
npm install
npm run dev

API Endpoint
POST /analyze-resume/
