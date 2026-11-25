# Mervie AI Backend

Node.js/Express API for Mervie AI - Intelligence for Maternal Health.

## Run
```bash
npm install
cp .env.example .env
npm run dev
```

## API
- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/dashboard/stats` (auth)
- `GET /api/dashboard/patients` (auth)
- `POST /api/contact`
- `POST /api/ai/assess` (auth)

## Deploy (Render)
- Build command: `npm install`
- Start command: `npm start`
- Env: `JWT_SECRET`, `FRONTEND_URL`
