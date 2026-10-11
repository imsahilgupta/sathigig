
from fastapi import APIRouter, Depends

from app.dependencies import get_current_user, require_roles

router = APIRouter(prefix="/api", tags=["Role-based access"])


@router.get("/dashboard")
def dashboard(user: dict = Depends(get_current_user)):
    """Return the logged-in user profile for the main dashboard route."""
    return {
        "message": "Welcome to your SathiGig dashboard.",
        "user": {
            "id": str(user["_id"]),
            "full_name": user["full_name"],
            "email": user["email"],
            "role": user["role"],
        },
    }


@router.get("/freelancer/workspace")
def freelancer_workspace(
    user: dict = Depends(require_roles("freelancer")),
):
    """Protected route for freelancer-only workspace access."""
    return {
        "message": "Freelancer workspace access granted.",
        "user_id": str(user["_id"]),
    }


@router.get("/employer/workspace")
def employer_workspace(
    user: dict = Depends(require_roles("employer")),
):
    """Protected route for employer-only workspace access."""
    return {
        "message": "Employer workspace access granted.",
        "user_id": str(user["_id"]),
    }


@router.get("/admin/workspace")
def admin_workspace(
    user: dict = Depends(require_roles("admin")),
):
    """Protected route for admin-only workspace access."""
    return {
        "message": "Admin workspace access granted.",
        "user_id": str(user["_id"]),
    }
