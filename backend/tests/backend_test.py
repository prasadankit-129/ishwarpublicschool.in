"""Backend tests for Ishwar Public School — cookie-based auth + endpoints."""
import os
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/") if os.environ.get("REACT_APP_BACKEND_URL") else "https://raipur-education.preview.emergentagent.com"
# Frontend .env not available in backend env; hardcode fallback from workspace .env
BASE_URL = "https://raipur-education.preview.emergentagent.com"

ADMIN_EMAIL = "admin@ishwarpublicschool.com"
ADMIN_PASSWORD = "Ishwar@2026"


@pytest.fixture
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture
def logged_in_session(session):
    r = session.post(f"{BASE_URL}/api/auth/login",
                     json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, r.text
    return session, r.json()["access_token"]


# ---------- Health ----------
def test_root():
    r = requests.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    assert r.json().get("status") == "ok"


# ---------- Auth ----------
def test_login_success_sets_cookie(session):
    r = session.post(f"{BASE_URL}/api/auth/login",
                     json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200
    data = r.json()
    assert "access_token" in data and data["access_token"]
    assert data["user"]["email"] == ADMIN_EMAIL
    assert data["user"]["role"] == "admin"
    # Cookie set
    assert "access_token" in session.cookies, f"Cookies: {session.cookies.get_dict()}"
    # httpOnly check via raw header
    set_cookie_hdr = r.headers.get("set-cookie", "")
    assert "HttpOnly" in set_cookie_hdr, f"set-cookie: {set_cookie_hdr}"


def test_login_wrong_password(session):
    r = session.post(f"{BASE_URL}/api/auth/login",
                     json={"email": ADMIN_EMAIL, "password": "wrongpass"})
    assert r.status_code == 401
    assert "detail" in r.json()


def test_me_with_cookie_only(logged_in_session):
    session, _ = logged_in_session
    # Explicitly remove Authorization header if any
    session.headers.pop("Authorization", None)
    r = session.get(f"{BASE_URL}/api/auth/me")
    assert r.status_code == 200, r.text
    assert r.json()["email"] == ADMIN_EMAIL


def test_me_without_auth():
    r = requests.get(f"{BASE_URL}/api/auth/me")
    assert r.status_code == 401


def test_logout_clears_cookie(logged_in_session):
    session, _ = logged_in_session
    r = session.post(f"{BASE_URL}/api/auth/logout")
    assert r.status_code == 200
    # Subsequent /me should be 401
    r2 = session.get(f"{BASE_URL}/api/auth/me")
    assert r2.status_code == 401


def test_bearer_fallback():
    s = requests.Session()
    login = s.post(f"{BASE_URL}/api/auth/login",
                   json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    token = login.json()["access_token"]
    # New session without cookie
    r = requests.get(f"{BASE_URL}/api/auth/me",
                     headers={"Authorization": f"Bearer {token}"})
    assert r.status_code == 200
    assert r.json()["email"] == ADMIN_EMAIL
    # Admin admissions with Bearer
    r2 = requests.get(f"{BASE_URL}/api/admin/admissions",
                      headers={"Authorization": f"Bearer {token}"})
    assert r2.status_code == 200
    assert isinstance(r2.json(), list)


# ---------- Public content ----------
@pytest.mark.parametrize("path", ["/api/news", "/api/events", "/api/gallery",
                                   "/api/testimonials", "/api/achievements"])
def test_public_endpoints(path):
    r = requests.get(f"{BASE_URL}{path}")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) > 0, f"{path} returned empty; expected seeded content"


# ---------- Admissions ----------
def test_create_admission_and_visible_to_admin():
    payload = {
        "parent_name": "TEST_Parent",
        "child_name": "TEST_Child",
        "phone": "9999999999",
        "email": "test_admission@example.com",
        "class_interested": "Grade 5",
        "branch": "Main",
        "message": "test",
    }
    r = requests.post(f"{BASE_URL}/api/admissions", json=payload)
    assert r.status_code == 200, r.text
    created = r.json()
    assert created["parent_name"] == "TEST_Parent"
    assert "id" in created

    # login and check via admin
    login = requests.post(f"{BASE_URL}/api/auth/login",
                          json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    token = login.json()["access_token"]
    r2 = requests.get(f"{BASE_URL}/api/admin/admissions",
                      headers={"Authorization": f"Bearer {token}"})
    assert r2.status_code == 200
    ids = [a["id"] for a in r2.json()]
    assert created["id"] in ids


# ---------- Admin CRUD news ----------
def test_admin_create_news():
    login = requests.post(f"{BASE_URL}/api/auth/login",
                          json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    token = login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    payload = {"title": "TEST_News", "content": "Body", "category": "notice"}
    r = requests.post(f"{BASE_URL}/api/admin/news", json=payload, headers=headers)
    assert r.status_code == 200, r.text
    item = r.json()
    assert item["title"] == "TEST_News"
    # Cleanup
    requests.delete(f"{BASE_URL}/api/admin/news/{item['id']}", headers=headers)
