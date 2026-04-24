from pymongo import MongoClient
import os

MONGO_URL = os.getenv("MONGO_URL")

if not MONGO_URL:
    raise Exception("MONGO_URL is not set")

client = MongoClient(MONGO_URL, serverSelectionTimeoutMS=5000)

# Force connection
client.server_info()

db = client["ai_resume_analyzer"]

chat_collection = db["chat_history"]
resume_collection = db["resume_data"]

print("MongoDB Connected Successfully")
