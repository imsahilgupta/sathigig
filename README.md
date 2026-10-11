# SathiGig

SathiGig is a Nepal-focused freelance marketplace that connects freelancers with employers, businesses, and clients. The platform supports role-based dashboards for freelancers, employers, and admins, and uses a Next.js frontend with a FastAPI backend and MongoDB.

## Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

### Backend
- FastAPI
- Python 3.11+
- MongoDB with PyMongo
- JWT authentication
- Pydantic

## Project Structure

```text
sathigig/
├── backend/
│   ├── app/
│   ├── .env
│   ├── requirements.txt
│   └── .gitignore
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── .env.local
│   ├── .gitignore
│   └── package.json
├── README.md
└── .gitignore
```

## Features

- Secure login and logout with JWT cookies
- Freelancer, employer, and admin role support
- Protected dashboard routes by role
- Responsive landing page and account flows
- MongoDB-backed user records
- Clean API structure with FastAPI

## Prerequisites

- Node.js 18+
- npm
- Python 3.11+
- MongoDB running locally or remotely

## Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd sathigig
```

### 2. Backend setup

```bash
cd backend
python -m venv .venv
# Windows PowerShell
.\.venv\Scripts\Activate.ps1
# macOS/Linux
# source .venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in `backend`:

```env
MONGO_URI=mongodb://localhost:27017/sathigig
JWT_SECRET=your-secret-key
JWT_ALGORITHM=HS256
FRONTEND_URL=http://localhost:3000
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in `frontend` if needed:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Run the frontend:

```bash
npm run dev
```

## App URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API docs: http://localhost:8000/docs

## Notes

- The frontend and backend are configured separately, so they should be started in different terminals.
- Admin-only access is enforced by role checks in both the API and the frontend route guards.

## License

This project is for local development and learning purposes unless a different license is added later.
