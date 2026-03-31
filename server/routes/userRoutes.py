from fastapi import APIRouter
from controllers.aiController import register_user, login_user, event_stream, get_history, get_profile,logout_user

router = APIRouter()
router.post("/register")(register_user)
router.post("/login")(login_user)
router.get("/profile")(get_profile)
router.post("/generate")(event_stream)
router.get("/history")(get_history)
router.post("/logout")(logout_user)
