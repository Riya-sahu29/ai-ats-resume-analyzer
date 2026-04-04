from pymongo import MongoClient

try:
    client = MongoClient("mongodb+srv://riya:riya12345@cluster0.d1tgism.mongodb.net/ai_resume_analyzer")

    db = client["ai_resume_analyzer"]

    chat_collection = db["chat_history"]
    resume_collection = db["resume_data"]

    print("MongoDB Connected Successfully")

except Exception as e:
    print("MongoDB Connection Error:", e)
