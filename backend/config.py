import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    REDIS_URL: str = os.getenv("REDIS_URL", "")          # leave empty = no cache (still works)
    DB_NAME: str = "ats_analyzer"
    GROQ_MODEL: str = "llama3-8b-8192"
    GROQ_TIMEOUT: int = 45        # seconds to wait for Groq before giving up
    GROQ_MAX_RETRIES: int = 3     # retry this many times on failure
    CACHE_TTL: int = 3600 * 24    # cache results for 24 hours
    MAX_FILE_SIZE_MB: int = 5

settings = Settings()