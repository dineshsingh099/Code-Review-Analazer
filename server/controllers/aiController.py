from fastapi import HTTPException, Request, Depends, Response
from fastapi.responses import StreamingResponse
from schemas.aiSchemas import UserCreate, UserLogin, UserResponse
from database.connection import ConnectDB
from models.aiModels import stream_ai_response
from utils.auth import hash_password, verify_password, create_access_token
from utils.profile import get_current_user
from datetime import datetime, timedelta

async def register_user(user: UserCreate):
    existing = await ConnectDB.db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")
    hashed_pwd = hash_password(user.password)
    user_doc = {"name": user.name, "email": user.email, "password": hashed_pwd, "created_at": datetime.utcnow()}
    result = await ConnectDB.db.users.insert_one(user_doc)
    return {"id": str(result.inserted_id), "name": user.name, "email": user.email}

async def login_user(user: UserLogin, response: Response):
    db_user = await ConnectDB.db.users.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(data={"sub": str(db_user["_id"])}, expires_delta=timedelta(minutes=60))
    response.set_cookie(key="access_token", value=token, httponly=True, secure=False, samesite="lax", max_age=7*24*60*60, path="/")
    return {"msg": "Login successful", "user": {"email": db_user["email"], "name": db_user["name"]}}

async def get_profile(current_user: dict = Depends(get_current_user)):
    return UserResponse(id=str(current_user["_id"]), name=current_user["name"], email=current_user["email"])

async def event_stream(request: Request, current_user: dict = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="User not found")
    data = await request.json()
    prompt = data.get("prompt", "")
    user_id = str(current_user["_id"])
    
    review_doc = {"user_id": user_id, "prompt": prompt, "response": [], "completed": False, "timestamp": datetime.utcnow()}
    
    doc = await ConnectDB.db.reviews.insert_one(review_doc)
    async def event_generator():
        try:
            async for chunk in stream_ai_response(prompt, user_id):
                await ConnectDB.db.reviews.update_one({"_id": doc.inserted_id}, {"$push": {"response": chunk}})
                yield chunk + "\n"
        except Exception as e:
            yield f"\n[Error]: {str(e)}\n"
        finally:
            await ConnectDB.db.reviews.update_one({"_id": doc.inserted_id}, {"$set": {"completed": True}})
    return StreamingResponse(event_generator(), media_type="text/plain")

async def get_history(current_user: dict = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=401, detail="User not authenticated")

    user_id = str(current_user["_id"])

    cursor = (
        ConnectDB.db.reviews
        .find({"user_id": user_id})
        .sort("timestamp", -1)
    )

    history = []
    async for doc in cursor:
        history.append({
            "prompt": doc.get("prompt"),
            "responses": doc.get("response", []),
            "completed": doc.get("completed", False),
            "timestamp": doc.get("timestamp") or datetime.utcnow()
        })

    return {"history": history}

#======Logout Function=================
async def logout_user(response: Response):
    response.delete_cookie(
        key="access_token",
        path="/"
    )
    return {"msg": "Logout successful"}