# Mervie AI Backend

Node.js/Express + MongoDB API for Mervie AI - Intelligence for Maternal Health.

## Setup
```bash
npm install
cp .env.example .env
# set MONGODB_URI, JWT_SECRET, FRONTEND_URL
npm start
```

## Render
- Build: `npm install`
- Start: `npm start`
- Env vars: `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`

## MongoDB Atlas (free)
1. https://cloud.mongodb.com → create free M0 cluster
2. Database Access → create DB user/password
3. Network Access → allow `0.0.0.0/0` (for Render)
4. Connect → Drivers → copy connection string into `MONGODB_URI`
