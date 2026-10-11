
import os
from datetime import datetime, timedelta, timezone

import jwt
from dotenv import load_dotenv
from pwdlib import PasswordHash

load_dotenv()

# Use a strong password hashing strategy that is easy to update later.
password_hasher = PasswordHash.recommended()

JWT_SECRET = os.getenv("JWT_SECRET")
if not JWT_SECRET:
    raise RuntimeError("JWT_SECRET is missing from the .env file")

JWT_ALGORITHM = "HS256"
SESSION_MINUTES = 30


def hash_password(password: str) -> str:
    """Hash a plain-text password before storing it in MongoDB."""
    return password_hasher.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    """Check whether a submitted password matches the stored hash."""
    return password_hasher.verify(password, password_hash)


def create_access_token(user_id: str) -> str:
    """Create a signed JWT for the authenticated user session."""
    now = datetime.now(timezone.utc)

    payload = {
        "sub": user_id,
        "iat": now,
        "exp": now + timedelta(minutes=SESSION_MINUTES),
    }

    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_access_token(token: str) -> dict:
    """Validate and decode the JWT from the browser session cookie."""
    return jwt.decode(
        token,
        JWT_SECRET,
        algorithms=[JWT_ALGORITHM],
        options={"require": ["sub", "exp"]},
    )
