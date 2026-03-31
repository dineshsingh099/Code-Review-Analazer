from fastapi import Request, HTTPException
from bson import ObjectId
from database.connection import ConnectDB
from utils.auth import verify_token

async def get_current_user(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user_id = verify_token(token)
    user = await ConnectDB.db["users"].find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
