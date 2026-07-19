"""Seed data helpers for Ishwar Public School.

Kept as small focused functions to reduce complexity of the startup handler.
"""
import uuid
from datetime import datetime, timezone


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _with_meta(item: dict) -> dict:
    return {**item, "id": str(uuid.uuid4()), "created_at": now_iso()}


NEWS_SEED = [
    {"title": "Admissions Open for 2026-27 Academic Session",
     "content": "Applications are now open for classes Nursery to XII at both Birgaon (Main) and Dhaneli branches. Limited seats available.",
     "category": "announcement", "is_active": True},
    {"title": "Annual Sports Day scheduled for March 15",
     "content": "Parents are cordially invited to the Annual Sports Day at Birgaon campus.",
     "category": "notice", "is_active": True},
    {"title": "Ishwar Public School celebrates 22 years of excellence",
     "content": "Since 2002, empowering minds and shaping futures in Raipur.",
     "category": "news", "is_active": True},
]

TESTIMONIALS_SEED = [
    {"name": "Priya Sharma", "role": "Parent",
     "content": "Ishwar Public School has been a blessing for my daughter. The teachers are dedicated and truly care about each child's growth.",
     "rating": 5, "is_active": True},
    {"name": "Rahul Verma", "role": "Alumni (Batch 2020)",
     "content": "The strong foundation I received at Ishwar Public School helped me get into a top engineering college. Forever grateful.",
     "rating": 5, "is_active": True},
    {"name": "Sunita Yadav", "role": "Parent",
     "content": "Both my children study here. Balanced focus on academics, sports and values. Excellent environment.",
     "rating": 5, "is_active": True},
]

EVENTS_SEED = [
    {"title": "Annual Sports Day 2026",
     "description": "A day of athletics, teamwork, and celebration featuring students from both branches.",
     "event_date": "2026-03-15", "location": "Birgaon Campus", "is_active": True},
    {"title": "Science Exhibition",
     "description": "Students showcase innovative projects across physics, chemistry, and biology.",
     "event_date": "2026-04-10", "location": "Birgaon Campus", "is_active": True},
    {"title": "Annual Cultural Program",
     "description": "An evening of music, dance, and drama celebrating Indian heritage.",
     "event_date": "2026-02-20", "location": "School Auditorium", "is_active": True},
]

ACHIEVEMENTS_SEED = [
    {"title": "100% Pass Rate in Class XII",
     "description": "All students cleared their board exams with distinction.",
     "year": "2025", "category": "academic"},
    {"title": "District-Level Kabaddi Champions",
     "description": "Our senior boys team won the district championship.",
     "year": "2024", "category": "sports"},
    {"title": "State-Level Science Olympiad Winner",
     "description": "Ananya Sharma from Class X secured 2nd position.",
     "year": "2024", "category": "academic"},
    {"title": "Best School Award - Dharshiwa Block",
     "description": "Recognized for holistic education and community impact.",
     "year": "2023", "category": "recognition"},
]

GALLERY_SEED = [
    {"title": "Modern Classrooms",
     "image_url": "https://images.pexels.com/photos/3231359/pexels-photo-3231359.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
     "category": "classroom"},
    {"title": "Playground Activities",
     "image_url": "https://images.pexels.com/photos/8926842/pexels-photo-8926842.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
     "category": "sports"},
    {"title": "Cultural Celebration",
     "image_url": "https://images.pexels.com/photos/35493021/pexels-photo-35493021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
     "category": "events"},
    {"title": "School Building",
     "image_url": "https://images.pexels.com/photos/20200756/pexels-photo-20200756.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
     "category": "campus"},
    {"title": "Students in Uniform",
     "image_url": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=940&q=80",
     "category": "students"},
    {"title": "Library Session",
     "image_url": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=940&q=80",
     "category": "library"},
    {"title": "Science Lab",
     "image_url": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=940&q=80",
     "category": "lab"},
    {"title": "Annual Function",
     "image_url": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=940&q=80",
     "category": "events"},
]


async def seed_collection_if_empty(db, name: str, items):
    if await db[name].count_documents({}) > 0:
        return 0
    docs = [_with_meta(dict(x)) for x in items]
    await db[name].insert_many(docs)
    return len(docs)


async def seed_all_content(db):
    await seed_collection_if_empty(db, "news", NEWS_SEED)
    await seed_collection_if_empty(db, "testimonials", TESTIMONIALS_SEED)
    await seed_collection_if_empty(db, "events", EVENTS_SEED)
    await seed_collection_if_empty(db, "achievements", ACHIEVEMENTS_SEED)
    await seed_collection_if_empty(db, "gallery", GALLERY_SEED)
