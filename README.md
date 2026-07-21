# Ishwar Public School Website

Ye ab simple static React website hai. Backend, MongoDB, database, aur admin panel ka use nahi hai.

## Localhost par chalana

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

Website ka data `frontend/src/data/siteData.js` me hai. Images `frontend/public/assets/images` me rakhi gayi hain.

Admission enquiry form FormSubmit ke through `admin@ishwarpublicschool.com` par email bhejta hai. Pehli baar FormSubmit school email par activation/confirmation mail bhej sakta hai.

## GitHub Pages par static preview

Is repo me `.github/workflows/deploy-frontend-pages.yml` added hai. Jab code `main` branch par push hoga, workflow frontend build karke GitHub Pages par deploy karega.

GitHub me ek baar:

1. Repository open karein.
2. Settings > Pages par jayein.
3. Source me GitHub Actions select karein.
4. Code push karein.

Preview URL:

```text
https://prasadankit-129.github.io/ishwarpublicschool.in/
```

Ab backend required nahi hai. Domain hosting ke liye GitHub Pages me custom domain set karke DNS records update karne hain.

## Safe GitHub publish note

Real `.env` files GitHub par upload nahi karni chahiye. Is static website ko normal hosting par environment variables ki zarurat nahi hai.
