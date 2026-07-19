# Ishwar Public School — Website PRD

## Original Problem Statement
Build a modern, ready-to-use website for **Ishwar Public School** (Raipur, Chhattisgarh) based on the details available from Google Maps, freeschoolapp, schools.org.in, Instagram and Facebook. The school has two branches:
- **Birgaon Campus** (Main, est. 2002) — Class 1 to 12, English medium, State Board.
- **Dhaneli Campus** (Local, est. 2013) — Class 1 to 8.

## Architecture
- **Frontend:** React 19 + React Router 7 + Tailwind + shadcn/ui + Framer + Sonner (toasts) + react-fast-marquee (news ticker).
- **Backend:** FastAPI + Motor (MongoDB) + Pydantic v2 + JWT (PyJWT) + bcrypt + Resend (email).
- **Design:** Playfair Display (headings) + Manrope (body). Navy `#0F172A` primary, Warm Ochre `#EA580C` secondary, Gold `#F59E0B` accent, Cream `#FEF9F0` surface.
- **Auth:** JWT Bearer token stored in localStorage (`ips_admin_token`), admin seeded on startup.

## User Personas
1. **Parent** browsing school info & filling admission enquiry.
2. **Prospective student** exploring academics, achievements, gallery.
3. **School Administrator** managing content via `/admin/dashboard`.

## Implemented (Feb 2026)
- Public site: Home (hero, stats, two-branch showcase, features, achievements strip, gallery preview, upcoming events, testimonials, CTA), About, Academics (stages, facilities, quick-facts), Faculty (leadership + departments), Gallery (grid + lightbox), News, Events, Achievements, Admissions (form + sidebar), Contact (two branches + Google Map embed).
- Scrolling news ticker below navbar (data from `/api/news`).
- Admission form → `POST /api/admissions` → persisted in MongoDB + fires Resend email if key configured (silently skipped otherwise).
- Admin login `/admin/login` (JWT). Admin dashboard `/admin/dashboard` with sidebar tabs: Overview, Admissions (status change + delete), News (CRUD), Events (CRUD), Gallery (CRUD), Testimonials (CRUD), Achievements (CRUD).
- Seed data on first startup: 3 news items, 3 events, 8 gallery images, 3 testimonials, 4 achievements, admin user.
- All endpoints under `/api/*`. External URL from `REACT_APP_BACKEND_URL`.
- Fully mobile-responsive with data-testid on all interactive elements.

## Backlog (P1)
- Rich-text editor for news/events content.
- Image upload (S3/object storage) instead of URL-only for gallery.
- Multi-admin roles (teacher, principal, admin).
- Public event RSVP.
- Newsletter subscription.
- Multi-language toggle (Hindi / English).

## Backlog (P2)
- Fee structure page with online payment (Razorpay/Stripe).
- Student/parent login portal (marks, attendance).
- Blog / stories from campus.
- SEO sitemap, structured data, robots.txt.

## Credentials
See `/app/memory/test_credentials.md`.
