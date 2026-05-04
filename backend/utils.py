import asyncio
import io
import logging
from concurrent.futures import ThreadPoolExecutor

logger = logging.getLogger(__name__)

# Thread pool for CPU-bound PDF work — keeps async event loop free
_executor = ThreadPoolExecutor(max_workers=4)


async def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """
    Extract text from PDF in a thread pool.
    CRITICAL FIX: pdfplumber is synchronous/blocking.
    Running it directly in FastAPI would freeze ALL requests.
    run_in_executor() moves it to a background thread safely.
    """
    loop = asyncio.get_event_loop()
    try:
        text = await loop.run_in_executor(_executor, _sync_extract, pdf_bytes)
        if not text.strip():
            raise ValueError(
                "PDF appears empty or is a scanned image. "
                "Please use a text-based PDF (not a photo scan)."
            )
        return text
    except ValueError:
        raise
    except Exception as e:
        logger.error(f"PDF extraction error: {e}")
        raise ValueError(f"Could not read PDF: {str(e)}")


def _sync_extract(pdf_bytes: bytes) -> str:
    """Synchronous PDF text extraction — runs inside thread pool."""
    import pdfplumber
    text_parts = []
    with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
        for page in pdf.pages:
            t = page.extract_text()
            if t:
                text_parts.append(t)
    return "\n".join(text_parts)