import logging
import datetime
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

logger = logging.getLogger(__name__)

_db_client = None


async def get_database():
    global _db_client
    if _db_client is None:
        try:
            _db_client = AsyncIOMotorClient(
                settings.MONGODB_URL,
                serverSelectionTimeoutMS=5000,
            )
            await _db_client.admin.command("ping")
            logger.info("✅ MongoDB connected")
        except Exception as e:
            logger.error(f"❌ MongoDB connection failed: {e}")
            raise
    return _db_client[settings.DB_NAME]


async def save_resume_data(resume_text: str, analysis: dict, session_id: str):
    """Save resume + analysis to MongoDB. Non-critical — won't crash app if it fails."""
    try:
        db = await get_database()
        await db.resume_data.insert_one({
            "session_id": session_id,
            "resume_text": resume_text[:5000],
            "analysis": analysis,
            "created_at": datetime.datetime.utcnow(),
        })
        logger.info(f"💾 Resume saved for session {session_id}")
    except Exception as e:
        logger.warning(f"Could not save resume to DB (non-fatal): {e}")


async def save_chat_message(session_id: str, role: str, content: str):
    """Save a single chat message. Non-critical."""
    try:
        db = await get_database()
        await db.chat_history.insert_one({
            "session_id": session_id,
            "role": role,
            "content": content,
            "created_at": datetime.datetime.utcnow(),
        })
    except Exception as e:
        logger.warning(f"Could not save chat message (non-fatal): {e}")


async def get_chat_history(session_id: str, limit: int = 10) -> list:
    """Fetch last N messages for a session. Returns [] on error."""
    try:
        db = await get_database()
        cursor = db.chat_history.find(
            {"session_id": session_id},
            sort=[("created_at", -1)],
            limit=limit,
        )
        messages = await cursor.to_list(length=limit)
        messages.reverse()   # oldest first
        return [{"role": m["role"], "content": m["content"]} for m in messages]
    except Exception as e:
        logger.warning(f"Could not fetch chat history (non-fatal): {e}")
        return []


async def get_resume_context(session_id: str) -> str:
    """Fetch stored resume summary for chatbot context."""
    try:
        db = await get_database()
        doc = await db.resume_data.find_one({"session_id": session_id})
        if doc and doc.get("analysis"):
            return doc["analysis"].get("summary", "")
        return ""
    except Exception as e:
        logger.warning(f"Could not fetch resume context: {e}")
        return ""