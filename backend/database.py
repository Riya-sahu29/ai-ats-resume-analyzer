from pymongo import MongoClient

try:
    # Connect to MongoDB
    client = MongoClient("mongodb://localhost:27017")

    # Create / use database
    db = client["ai_resume_analyzer"]

    # Collections
    chat_collection = db["chat_history"]
    resume_collection = db["resume_data"]

    print("MongoDB Connected Successfully")

except Exception as e:
    print("MongoDB Connection Error:", e)
