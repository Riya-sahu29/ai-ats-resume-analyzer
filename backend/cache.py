import hashlib
import json
import logging
from config import settings

logger = logging.getLogger(__name__)

# Optional Redis — app works fine without it
_redis_client = None

async def get_redis():
    global _redis_client
    if not settings.REDIS_URL:
        return None  # Redis not configured — skip caching silently
    if _redis_client is not None:
        return _redis_client
    try:
        import redis.asyncio as redis
        _redis_client = redis.from_url(
            settings.REDIS_URL,
            encoding="utf-8",
            decode_responses=True,
            socket_connect_timeout=5,
            socket_timeout=5,
        )
        await _redis_client.ping()
        logger.info("✅ Redis connected")
    except Exception as e:
        logger.warning(f"⚠️ Redis unavailable: {e}. Running without cache.")
        _redis_client = None
    return _redis_client


def make_cache_key(resume_text: str, job_description: str) -> str:
    """Create a unique hash key from resume + JD text."""
    combined = f"{resume_text.strip()}||{job_description.strip()}"
    return "ats:" + hashlib.sha256(combined.encode()).hexdigest()


async def get_cached_result(key: str) -> dict | None:
    r = await get_redis()
    if r is None:
        return None
    try:
        cached = await r.get(key)
        if cached:
            logger.info(f"🎯 Cache HIT for key {key[:20]}...")
            return json.loads(cached)
    except Exception as e:
        logger.warning(f"Cache get error: {e}")
    return None


async def set_cached_result(key: str, data: dict) -> None:
    r = await get_redis()
    if r is None:
        return
    try:
        await r.setex(key, settings.CACHE_TTL, json.dumps(data))
        logger.info(f"💾 Cached result for key {key[:20]}...")
    except Exception as e:
        logger.warning(f"Cache set error: {e}")