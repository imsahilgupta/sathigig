
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import connect_to_mongodb
from app.routes.auth import router as auth_router
from app.routes.workspaces import router as workspaces_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Run startup setup for the API before requests begin."""
    connect_to_mongodb()
    yield


app = FastAPI(
    title="SathiGig API",
    description="Authentication API for the SathiGig marketplace",
    version="1.0.0",
    lifespan=lifespan,
)

frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)


@app.get("/")
def home():
    """Health check endpoint for the backend service."""
    return {"message": "Welcome to the SathiGig API"}


app.include_router(auth_router)
app.include_router(workspaces_router)
