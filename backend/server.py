from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import os
import asyncio
import logging
import uuid
from datetime import datetime, timezone, timedelta
from typing import List, Optional

import bcrypt
import jwt
import resend
from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Response
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from starlette.middleware.cors import CORSMiddleware

from seed_data import seed_all_content, now_iso

# ---------- Setup ----------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

JWT_ALGORITHM = "HS256"
JWT_SECRET = os.environ.get("JWT_SECRET", "change-me")
RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
ADMIN_NOTIFY_EMAIL = os.environ.get("ADMIN_NOTIFY_EMAIL", "admin@ishwarpublicschool.com")
COOKIE_SECURE = os.environ.get("COOKIE_SECURE", "true").lower() == "true"
ACCESS_TOKEN_MAX_AGE = 7 * 24 * 3600  # 7 days

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

app = FastAPI(title="Ishwar Public School API")
api_router = APIRouter(prefix="/api")

# ---------- Auth helpers ----------
def hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(pw: str, hashed: str) -> bool:
    return bcrypt.checkpw(pw.encode("utf-8"), hashed.encode("utf-8"))

def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(seconds=ACCESS_TOKEN_MAX_AGE),
        "type": "access",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def set_auth_cookie(response: Response, token: str) -> None:
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite="lax",
        max_age=ACCESS_TOKEN_MAX_AGE,
        path="/",
    )

def clear_auth_cookie(response: Response) -> None:
    response.delete_cookie(key="access_token", path="/")

def _extract_token(request: Request) -> Optional[str]:
    token = request.cookies.get("access_token")
    if token:
        return token
    auth = request.headers.get("Authorization", "")
    if auth.startswith("Bearer "):
        return auth[7:]
    return None

async def get_current_admin(request: Request):
    token = _extract_token(request)
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
    if not user or user.get("role") != "admin":
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user

async def send_admission_email(admission: dict):
    """Send email notification to admin. Silently skip if Resend not configured."""
    if not RESEND_API_KEY:
        logger.info("Resend not configured; skipping email notification.")
        return
    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#fafafa">
      <h2 style="color:#0F172A">New Admission Enquiry — Ishwar Public School</h2>
      <table style="width:100%;border-collapse:collapse;background:#fff;padding:12px">
        <tr><td style="padding:8px;font-weight:600">Parent Name</td><td>{admission.get('parent_name','')}</td></tr>
        <tr><td style="padding:8px;font-weight:600">Child Name</td><td>{admission.get('child_name','')}</td></tr>
        <tr><td style="padding:8px;font-weight:600">Phone</td><td>{admission.get('phone','')}</td></tr>
        <tr><td style="padding:8px;font-weight:600">Email</td><td>{admission.get('email','')}</td></tr>
        <tr><td style="padding:8px;font-weight:600">Class Interested</td><td>{admission.get('class_interested','')}</td></tr>
        <tr><td style="padding:8px;font-weight:600">Branch</td><td>{admission.get('branch','')}</td></tr>
        <tr><td style="padding:8px;font-weight:600">Message</td><td>{admission.get('message','')}</td></tr>
      </table>
      <p style="color:#475569;font-size:12px;margin-top:16px">Submitted at {admission.get('created_at','')}</p>
    </div>
    """
    try:
        await asyncio.to_thread(resend.Emails.send, {
            "from": SENDER_EMAIL,
            "to": [ADMIN_NOTIFY_EMAIL],
            "subject": f"New Admission Enquiry: {admission.get('child_name','')}",
            "html": html,
        })
    except Exception as e:
        logger.error(f"Resend send failed: {e}")

# ---------- Models ----------
class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class AdmissionCreate(BaseModel):
    parent_name: str
    child_name: str
    phone: str
    email: Optional[EmailStr] = None
    class_interested: str
    branch: str
    message: Optional[str] = ""

class Admission(AdmissionCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "new"
    created_at: str = Field(default_factory=now_iso)

class NewsCreate(BaseModel):
    title: str
    content: str
    category: str = "notice"
    is_active: bool = True

class NewsItem(NewsCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=now_iso)

class EventCreate(BaseModel):
    title: str
    description: str
    event_date: str
    location: str = ""
    is_active: bool = True

class EventItem(EventCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=now_iso)

class GalleryCreate(BaseModel):
    title: str
    image_url: str
    category: str = "general"

class GalleryItem(GalleryCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=now_iso)

class TestimonialCreate(BaseModel):
    name: str
    role: str
    content: str
    rating: int = 5
    is_active: bool = True

class TestimonialItem(TestimonialCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=now_iso)

class AchievementCreate(BaseModel):
    title: str
    description: str
    year: str
    category: str = "academic"

class AchievementItem(AchievementCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=now_iso)

# ---------- Startup helpers (small focused functions) ----------
async def _ensure_indexes():
    await db.users.create_index("email", unique=True)

async def _seed_admin_user():
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@ishwarpublicschool.com").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")
    existing = await db.users.find_one({"email": admin_email})
    if not existing:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Administrator",
            "role": "admin",
            "created_at": now_iso(),
        })
        logger.info(f"Seeded admin: {admin_email}")
        return
    if not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}}
        )
        logger.info(f"Updated admin password: {admin_email}")

@app.on_event("startup")
async def startup():
    await _ensure_indexes()
    await _seed_admin_user()
    await seed_all_content(db)

@app.on_event("shutdown")
async def shutdown():
    client.close()

# ---------- Public Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Ishwar Public School API", "status": "ok"}

@api_router.post("/auth/login")
async def login(data: AdminLogin, response: Response):
    user = await db.users.find_one({"email": data.email.lower()})
    if not user or not verify_password(data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(user["id"], user["email"])
    set_auth_cookie(response, token)
    return {
        "access_token": token,  # kept for backwards-compat / API testing (Bearer)
        "token_type": "bearer",
        "user": {"id": user["id"], "email": user["email"], "name": user["name"], "role": user["role"]},
    }

@api_router.post("/auth/logout")
async def logout(response: Response):
    clear_auth_cookie(response)
    return {"ok": True}

@api_router.get("/auth/me")
async def me(current=Depends(get_current_admin)):
    return current

@api_router.post("/admissions", response_model=Admission)
async def create_admission(data: AdmissionCreate):
    admission = Admission(**data.model_dump())
    doc = admission.model_dump()
    await db.admissions.insert_one(doc)
    asyncio.create_task(send_admission_email(doc))
    return admission

@api_router.get("/news", response_model=List[NewsItem])
async def list_news():
    return await db.news.find({"is_active": True}, {"_id": 0}).sort("created_at", -1).to_list(100)

@api_router.get("/events", response_model=List[EventItem])
async def list_events():
    return await db.events.find({"is_active": True}, {"_id": 0}).sort("event_date", 1).to_list(100)

@api_router.get("/gallery", response_model=List[GalleryItem])
async def list_gallery():
    return await db.gallery.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)

@api_router.get("/testimonials", response_model=List[TestimonialItem])
async def list_testimonials():
    return await db.testimonials.find({"is_active": True}, {"_id": 0}).sort("created_at", -1).to_list(50)

@api_router.get("/achievements", response_model=List[AchievementItem])
async def list_achievements():
    return await db.achievements.find({}, {"_id": 0}).sort("year", -1).to_list(100)

# ---------- Admin Routes ----------
@api_router.get("/admin/admissions", response_model=List[Admission])
async def admin_list_admissions(_=Depends(get_current_admin)):
    return await db.admissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)

@api_router.patch("/admin/admissions/{aid}")
async def admin_update_admission(aid: str, status: str, _=Depends(get_current_admin)):
    result = await db.admissions.update_one({"id": aid}, {"$set": {"status": status}})
    if result.matched_count == 0:
        raise HTTPException(404, "Not found")
    return {"ok": True}

@api_router.delete("/admin/admissions/{aid}")
async def admin_delete_admission(aid: str, _=Depends(get_current_admin)):
    await db.admissions.delete_one({"id": aid})
    return {"ok": True}

@api_router.post("/admin/news", response_model=NewsItem)
async def admin_create_news(data: NewsCreate, _=Depends(get_current_admin)):
    item = NewsItem(**data.model_dump())
    await db.news.insert_one(item.model_dump())
    return item

@api_router.get("/admin/news", response_model=List[NewsItem])
async def admin_list_news(_=Depends(get_current_admin)):
    return await db.news.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)

@api_router.delete("/admin/news/{nid}")
async def admin_delete_news(nid: str, _=Depends(get_current_admin)):
    await db.news.delete_one({"id": nid})
    return {"ok": True}

@api_router.post("/admin/events", response_model=EventItem)
async def admin_create_event(data: EventCreate, _=Depends(get_current_admin)):
    item = EventItem(**data.model_dump())
    await db.events.insert_one(item.model_dump())
    return item

@api_router.get("/admin/events", response_model=List[EventItem])
async def admin_list_events(_=Depends(get_current_admin)):
    return await db.events.find({}, {"_id": 0}).sort("event_date", 1).to_list(200)

@api_router.delete("/admin/events/{eid}")
async def admin_delete_event(eid: str, _=Depends(get_current_admin)):
    await db.events.delete_one({"id": eid})
    return {"ok": True}

@api_router.post("/admin/gallery", response_model=GalleryItem)
async def admin_create_gallery(data: GalleryCreate, _=Depends(get_current_admin)):
    item = GalleryItem(**data.model_dump())
    await db.gallery.insert_one(item.model_dump())
    return item

@api_router.delete("/admin/gallery/{gid}")
async def admin_delete_gallery(gid: str, _=Depends(get_current_admin)):
    await db.gallery.delete_one({"id": gid})
    return {"ok": True}

@api_router.post("/admin/testimonials", response_model=TestimonialItem)
async def admin_create_testimonial(data: TestimonialCreate, _=Depends(get_current_admin)):
    item = TestimonialItem(**data.model_dump())
    await db.testimonials.insert_one(item.model_dump())
    return item

@api_router.get("/admin/testimonials", response_model=List[TestimonialItem])
async def admin_list_testimonials(_=Depends(get_current_admin)):
    return await db.testimonials.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)

@api_router.delete("/admin/testimonials/{tid}")
async def admin_delete_testimonial(tid: str, _=Depends(get_current_admin)):
    await db.testimonials.delete_one({"id": tid})
    return {"ok": True}

@api_router.post("/admin/achievements", response_model=AchievementItem)
async def admin_create_achievement(data: AchievementCreate, _=Depends(get_current_admin)):
    item = AchievementItem(**data.model_dump())
    await db.achievements.insert_one(item.model_dump())
    return item

@api_router.delete("/admin/achievements/{aid}")
async def admin_delete_achievement(aid: str, _=Depends(get_current_admin)):
    await db.achievements.delete_one({"id": aid})
    return {"ok": True}

@api_router.get("/admin/stats")
async def admin_stats(_=Depends(get_current_admin)):
    return {
        "admissions": await db.admissions.count_documents({}),
        "admissions_new": await db.admissions.count_documents({"status": "new"}),
        "news": await db.news.count_documents({}),
        "events": await db.events.count_documents({}),
        "gallery": await db.gallery.count_documents({}),
        "testimonials": await db.testimonials.count_documents({}),
    }

app.include_router(api_router)

# CORS — explicit origins required when allow_credentials=True
_origins_env = os.environ.get("CORS_ORIGINS", "").strip()
_cors_origins = [o.strip() for o in _origins_env.split(",") if o.strip()] or ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=_cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)
