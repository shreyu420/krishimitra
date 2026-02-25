# KrishiMitra Backend API (Express + SQLite)

## Stack
- Node.js + Express.js
- SQLite database (`sqlite3` + `sqlite`)
- JWT authentication

## API Endpoints used by frontend
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/auth/me` (JWT required)
- `GET /api/alerts`
- `GET /api/mandi-prices?state=Gujarat&crop=Tomato`
- `GET /api/weather?location=Rajkot,%20Gujarat`
- `GET /api/diagnoses` (JWT required)
- `POST /api/diagnoses` (JWT required)

## Local setup
```bash
cd backend
npm install
cp .env.example .env
npm start
```

## Database setup / migration
No external DB setup is required. On startup, schema creation + seed data runs automatically against `DB_PATH`.

## Run tests
```bash
cd backend
npm test
```
