import os
from groq import Groq
from database import chat_collection

# Create Groq client
client = Groq(
    api_key="groq_api_key"
)


def chat_with_ai(user_id: str, message: str, resume_context: str = None):

    try:

        # 1. System message
        messages = [
            {
                "role": "system",
                "content": "You are an AI career assistant helping with resume, skills, interview preparation, and career guidance."
            }
        ]

        # 2. Add resume context if available
        if resume_context:
            messages.append(
                {
                    "role": "system",
                    "content": f"User Resume Context: {resume_context}"
                }
            )

        # 3. Load previous chats from MongoDB
        previous_chats = chat_collection.find(
            {"user_id": user_id}
        ).sort("_id", 1)

        for chat in previous_chats:

            messages.append(
                {
                    "role": "user",
                    "content": chat["message"]
                }
            )

            messages.append(
                {
                    "role": "assistant",
                    "content": chat["reply"]
                }
            )

        # 4. Add current user message
        messages.append(
            {
                "role": "user",
                "content": message
            }
        )

        print("DEBUG messages:", messages)

        # 5. Call Groq AI
        response = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=messages,
            temperature=0.7
        )

        reply = response.choices[0].message.content

        # 6. Save chat in MongoDB
        chat_collection.insert_one(
            {
                "user_id": user_id,
                "message": message,
                "reply": reply
            }
        )

        return reply

    except Exception as e:

        print("ERROR in chat_with_ai:", str(e))

        return "Error: AI response failed"