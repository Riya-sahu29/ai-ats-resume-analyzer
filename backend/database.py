from pymongo import MongoClient
import os

MONGO_URL = os.getenv("MONGO_URL")

try:
    client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=5000)

    # Force connection check
    client.server_info()

    db = client["ai_resume_analyzer"]

    chat_collection = db["chat_history"]
    resume_collection = db["resume_data"]

    print("MongoDB Connected Successfully")

except Exception as e:
    print("MongoDB Connection Error:", e)
