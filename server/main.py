from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.connection import ConnectDB
from routes.userRoutes import router

app = FastAPI()

origins = [
    "http://localhost:8171",
    "http://127.0.0.1:8171"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(router, prefix="/users")

@app.on_event("startup")
async def startup_event():
    await ConnectDB.connect()

@app.on_event("shutdown")
async def shutdown_event():
    await ConnectDB.close()
