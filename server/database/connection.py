from motor.motor_asyncio import AsyncIOMotorClient
from config.settings import settings

class ConnectDB:
    client: AsyncIOMotorClient | None = None
    db = None

    @classmethod
    async def connect(cls):
        cls.client = AsyncIOMotorClient(settings.MONGO_URL)
        cls.db = cls.client[settings.MONGO_DB]
        print("✅ MongoDB connected")

    @classmethod
    async def close(cls):
        if cls.client:
            cls.client.close()
            print("❌ MongoDB connection closed")

    @classmethod
    def get_collection(cls, name: str):
        if cls.db:
            return cls.db[name]
        raise Exception("Database not connected")
