import httpx
import logging
import os
from dotenv import load_dotenv
from database import get_chat_history, save_chat_message

load_dotenv()

logger = logging.getLogger(__name__)

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL   = "llama-3.1-8b-instant"


async def chat_with_ai(user_id: str, user_message: str, resume_context: str = "") -> str:

    # Load past messages from MongoDB
    history = await get_chat_history(user_id, limit=6)

    # Keep system prompt short and clean
    system_content = "You are a helpful AI career advisor. Give short, practical advice under 150 words."

    # Only add resume context if it exists and is not empty
    if resume_context and resume_context.strip():
        # Limit context length to avoid 400 error
        system_content += f"\n\nUser resume context: {resume_context.strip()[:500]}"

    messages = [{"role": "system", "content": system_content}]

    # Add history (only valid role/content pairs)
    for msg in history:
        if msg.get("role") in ("user", "assistant") and msg.get("content"):
            messages.append({"role": msg["role"], "content": msg["content"]})

    # Add current user message
    messages.append({"role": "user", "content": user_message.strip()})

    try:
        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {GROQ_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": GROQ_MODEL,
                    "messages": messages,
                    "max_tokens": 300,
                    "temperature": 0.7,
                },
            )

            # Log error details so we can see exactly what Groq rejected
            if response.status_code != 200:
                logger.error(f"Groq chat error {response.status_code}: {response.text}")
                return "I am having trouble responding right now. Please try again."

            reply = response.json()["choices"][0]["message"]["content"].strip()

        # Save to MongoDB
        await save_chat_message(user_id, "user", user_message)
        await save_chat_message(user_id, "assistant", reply)

        return reply

    except Exception as e:
        logger.error(f"Chatbot error: {e}")
        return "I am having trouble responding right now. Please try again in a moment."