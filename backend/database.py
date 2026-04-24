from pymongo import MongoClient
import os

MONGO_URL = os.getenv("MONGO_URL")

client = MongoClient(MONGO_URL)

db = client["ai_resume_analyzer"]

chat_collection = db["chat_history"]
resume_collection = db["resume_data"]
