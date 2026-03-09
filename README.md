# 🤖 AI Resume Analyzer with AI Chatbot Memory

An intelligent full-stack web application that analyzes resumes using AI and provides personalized career guidance through a chatbot with memory.

Built using FastAPI, React, MongoDB, and Groq AI.

---

# 🚀 Features

✅ AI-powered ATS Resume Analysis
✅ AI Chatbot with Memory (MongoDB)
✅ Resume-based Career Guidance
✅ FastAPI REST Backend
✅ Modern React + Tailwind Frontend
✅ MongoDB Database Integration
✅ Real-world production-level project  

---

# 🧠 How it Works

1. User uploads resume and job description
2. AI analyzes resume and gives ATS score
3. Resume data is stored in MongoDB
4. Chatbot uses stored resume context
5. Chatbot provides personalized career advice

---

# 🛠 Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Axios

## Backend

* FastAPI
* Python
* REST API

## Database

* MongoDB

## AI

* Groq API (LLM)

---

# 📂 Project Structure 

```
ai-ats-resume-analyzer/
│
├── backend/
│   ├── main.py
│   ├── chatbot.py
│   ├── database.py
│   ├── resume_ai.py
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone repository

```
git clone https://github.com/Riya-sahu29/ai-ats-resume-analyzer.git
cd ai-ats-resume-analyzer
```

---

## 2. Backend Setup

```
cd backend

python -m venv .venv
.venv\Scripts\activate

pip install -r requirements.txt
```

Create `.env`

```
GROQ_API_KEY=your_api_key
```

Run backend:

```
uvicorn main:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

---

## 3. Frontend Setup

```
cd frontend

npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 📡 API Endpoints

## Analyze Resume

```
POST /analyze-resume
```

## Chatbot

```
POST /chat
```

---

# 🧠 Database Collections

MongoDB automatically creates:

```
chat_history
resume_data
```

---

# 💬 Example Chat

User:

```
Suggest backend skills based on my resume
```

AI:

```
You should focus on FastAPI, MongoDB, REST API, Docker, and cloud deployment.
```

---

# 🎯 Use Cases

* Students preparing for placements
* Resume improvement
* Career guidance
* Interview preparation

---

# 🔮 Future Improvements

* User authentication
* Resume history dashboard
* Cloud deployment (AWS)
* Vector database memory
* Multi-resume support

---

# 👩‍💻 Author

Riya Priyadarsani Sahu

GitHub:
https://github.com/Riya-sahu29

---

# ⭐ Resume-Level Project Highlights

✔ Full-Stack Application
✔ AI Integration
✔ Database Memory  
✔ REST API Development
✔ Production Architecture

---

# 📜 License

This project is for educational and portfolio purposes.
