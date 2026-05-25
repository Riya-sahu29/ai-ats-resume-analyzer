import os
import logging
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

class Settings:
    GROQ_API_KEY: str  = os.getenv("GROQ_API_KEY", "")
    MONGODB_URL: str   = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    REDIS_URL: str     = os.getenv("REDIS_URL", "")
    DB_NAME: str       = "ats_analyzer"
    GROQ_MODEL: str    = "llama-3.1-8b-instant"
    GROQ_TIMEOUT: int  = 45
    GROQ_MAX_RETRIES: int = 3
    CACHE_TTL: int     = 3600 * 24
    MAX_FILE_SIZE_MB: int = 5

    # BUG FIX: CORS — allow_origins=["*"] + allow_credentials=True crashes browsers.
    # Set ALLOWED_ORIGINS on Render to your Vercel URL e.g. https://myapp.vercel.app
    # Leave blank in development to allow all origins (credentials will be disabled).
    _origins_env = os.getenv("ALLOWED_ORIGINS", "")
    ALLOWED_ORIGINS: list = (
        [o.strip() for o in _origins_env.split(",") if o.strip()]
        if _origins_env else ["*"]
    )

settings = Settings()

# ── Startup validation — shows clearly in Render logs ─────────────────────────
def _validate():
    if not settings.GROQ_API_KEY:
        logger.error("❌ GROQ_API_KEY not set — AI analysis and chat will fail!")
    else:
        logger.info("✅ GROQ_API_KEY configured")

    if not settings.REDIS_URL:
        logger.warning("⚠️ REDIS_URL not set — caching disabled (app still works)")

    if settings.MONGODB_URL == "mongodb://localhost:27017":
        logger.warning("⚠️ MONGODB_URL is using localhost default — set it on Render")

    if "*" in settings.ALLOWED_ORIGINS:
        logger.warning("⚠️ ALLOWED_ORIGINS=* — set your Vercel URL on Render for production")

_validate()
