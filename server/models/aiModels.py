from google import genai
from config.settings import settings
from database.connection import ConnectDB
import asyncio

client = genai.Client(api_key=settings.GOOGLE_GEMINI_KEY)

async def stream_ai_response(prompt: str, user_id: str = "anonymous"):
    review_doc = {"user_id": user_id, "prompt": prompt, "response": [], "completed": False}
    insert_result = await ConnectDB.db.reviews.insert_one(review_doc)
    retries = 3
    for attempt in range(retries):
        try:
            response = await asyncio.to_thread(
                lambda: client.models.generate_content(
                    model="gemini-2.5-flash",
                    contents=f"{settings.SYSTEM_INSTRUCTION}\n{prompt}"
                )
            )
            await ConnectDB.db.reviews.update_one(
                {"_id": insert_result.inserted_id},
                {"$set": {"response": [response.text], "completed": True}}
            )
            yield response.text
            return
        except Exception as e:
            if "503" in str(e):
                await asyncio.sleep(2 ** attempt)
            else:
                await ConnectDB.db.reviews.update_one(
                    {"_id": insert_result.inserted_id},
                    {"$set": {"response": [f"[Error]: {str(e)}"], "completed": True}}
                )
                yield f"[Error]: {str(e)}"
                return
    await ConnectDB.db.reviews.update_one(
        {"_id": insert_result.inserted_id},
        {"$set": {"response": ["[Error]: Model overloaded, try again later"], "completed": True}}
    )
    yield "[Error]: Model overloaded, try again later"
