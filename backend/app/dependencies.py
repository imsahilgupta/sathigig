
from typing import Callable

from bson import ObjectId
from fastapi import Depends, HTTPException, Request, status
from pymongo.errors import PyMongoError

from app.database import users_collection
from app.security import decode_access_token


COOKIE_NAME = "sathigig_session"


def get_current_user(request: Request) -> dict:
    """Read the session cookie, validate the JWT, and fetch the current user."""
    token = request.cookies.get(COOKIE_NAME)

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please log in first.",
        )

    try:
        payload = decode_access_token(token)
        user_id = ObjectId(payload["sub"])
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired session. Please log in again.",
        )

    try:
        user = users_collection.find_one({"_id": user_id})
    except PyMongoError:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication service is temporarily unavailable.",
        )

    if not user or not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account not found or disabled.",
        )

    return user


def require_roles(*allowed_roles: str) -> Callable:
    """Guard endpoints so only specific roles can access them."""

    def role_checker(
        user: dict = Depends(get_current_user),
    ) -> dict:
        if user.get("role") not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to access this resource.",
            )

        return user

    return role_checker
