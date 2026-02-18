from pymongo import MongoClient

try:
    
    client = MongoClient("mongodb://localhost:27017")

    db = client["ai_resume_analyzer"]

    chat_collection = db["chat_history"]

    resumme_collection = db["resume_data"]

    print("MongoDB Connected Successfully")


except Exception as e:
    print("MongoDB Connection Error:")   