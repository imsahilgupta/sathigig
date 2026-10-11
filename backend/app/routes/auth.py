
import os
from datetime import datetime, timezone

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from pymongo.errors import DuplicateKeyError, PyMongoError

from app.database import users_collection
from app.dependencies import get_current_user
from app.schemas import LoginRequest, RegisterRequest, UserResponse
from app.security import create_access_token, hash_password, verify_password

load_dotenv()

COOKIE_NAME = "sathigig_session"
COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() == "true"

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register_user(data: RegisterRequest):
    """Create a new user account and return only public profile data."""
    email = str(data.email).lower()

    if users_collection.find_one({"email": email}, {"_id": 1}):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    user = {
        "full_name": data.full_name,
        "email": email,
        "password_hash": hash_password(data.password),
        "role": data.role,
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
    }

    try:
        result = users_collection.insert_one(user)
    except DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )
    except PyMongoError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Registration is temporarily unavailable. Please try again.",
        )

    return UserResponse(
        id=str(result.inserted_id),
        full_name=user["full_name"],
        email=user["email"],
        role=user["role"],
        is_active=user["is_active"],
    )


@router.post("/login")
def login_user(data: LoginRequest, response: Response):
    """Validate the user, then issue the session cookie for the frontend."""
    email = str(data.email).lower()
    user = users_collection.find_one({"email": email})

    if not user or not verify_password(data.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This account is disabled.",
        )

    token = create_access_token(str(user["_id"]))

    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite="lax",
        max_age=30 * 60,
        path="/",
    )

    return {
        "message": "Login successful.",
        "user": {
            "id": str(user["_id"]),
            "full_name": user["full_name"],
            "email": user["email"],
            "role": user["role"],
        },
    }


@router.get("/me")
def read_current_user(
    user: dict = Depends(get_current_user),
):
    """Return the active user from the authenticated session."""
    return {
        "id": str(user["_id"]),
        "full_name": user["full_name"],
        "email": user["email"],
        "role": user["role"],
        "is_active": user.get("is_active", True),
    }


@router.post("/logout")
def logout_user(response: Response):
    """Clear the HTTP-only session cookie from the browser."""
    response.delete_cookie(
        key=COOKIE_NAME,
        path="/",
        httponly=True,
        secure=COOKIE_SECURE,
        samesite="lax",
    )

    return {"message": "Logged out successfully."}
