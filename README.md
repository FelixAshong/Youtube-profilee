# Here are your Instructions

## Node + React Start (Local)

1. Install Node.js LTS from https://nodejs.org
2. Backend (Node):
   - `cd backend-node`
   - `npm install` (installs express, cors, dotenv)
   - Create `.env` (optional):
     - `PORT=8000`
     - `CORS_ORIGINS=*`
   - `npm start` (starts API on http://localhost:8000)
3. Frontend (React/CRA):
   - `cd frontend`
   - `npm install` (or `yarn install` if Yarn is available)
   - `npm start`
   - CRA dev server will proxy `/api/*` to `http://localhost:8000`

## API Endpoints
- `GET /api/` – root
- `GET /api/channel/info`
- `GET /api/videos/latest`
- `GET /api/playlists`
- `GET /api/videos/featured`
- `GET /api/health`

## Notes
- The Python FastAPI backend remains in `backend/` but is not required when using the Node backend.