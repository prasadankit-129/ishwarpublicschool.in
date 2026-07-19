# Ishwar Public School Website

Ye project Emergent export se aaya hua React frontend + FastAPI backend app hai.

## Localhost par chalana

### 1. Zaruri software

- Node.js install hona chahiye.
- Backend/admin features ke liye Python 3.11+ aur MongoDB Community Server install hona chahiye.

### 2. Frontend preview

Visual Studio Code me project folder open karke terminal chalayein:

```powershell
cd frontend
npm install
npm start
```

Browser me open karein:

```text
http://localhost:3000
```

Fast static preview ke liye:

```powershell
cd frontend
npm run build
npm run preview
```

Frontend ki local config `frontend/.env` me hai:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
ENABLE_HEALTH_CHECK=false
```

Backend band ho tab bhi public pages fallback content ke saath dikh jayenge.

### 3. Backend/API chalana

Python aur MongoDB install hone ke baad ek alag terminal me:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

Backend health check:

```text
http://localhost:8001/api/
```

MongoDB Windows service check karne ke liye:

```powershell
Get-Service MongoDB
Start-Service MongoDB
```

Admin login local `.env` me configured hai. Production me password aur JWT secret change karna zaruri hai.

## GitHub Pages par static preview

Is repo me `.github/workflows/deploy-frontend-pages.yml` added hai. Jab code `main` branch par push hoga, workflow frontend build karke GitHub Pages par deploy karega.

GitHub me ek baar:

1. Repository open karein.
2. Settings > Pages par jayein.
3. Source me GitHub Actions select karein.
4. Code push karein.

Preview URL aam taur par aisa hoga:

```text
https://prasadankit-129.github.io/ishwarpublicschool.in/
```

GitHub Pages Python backend ya MongoDB host nahi karta. Isliye public website preview chalega, lekin admin panel, admission form save, live news/gallery/events updates ke liye backend ko Render, Railway, VPS, ya kisi Python hosting par deploy karna padega.

## Domain hosting

Production setup ke liye:

- Frontend build ko GitHub Pages, Netlify, Vercel, ya shared hosting par host kar sakte hain.
- Backend ko Python-compatible hosting par host karein.
- Production frontend env me `REACT_APP_BACKEND_URL` ko backend domain par set karein.
- Backend `.env` me `CORS_ORIGINS` me final frontend domain add karein.
- HTTPS domain par `COOKIE_SECURE="true"` use karein.

## Safe GitHub publish note

Real `.env` files GitHub par upload nahi karni chahiye. Is repo me `.env.example` files placeholders ke liye rakhi gayi hain.
