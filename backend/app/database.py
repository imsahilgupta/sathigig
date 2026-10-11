
import os

from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import PyMongoError

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME", "sathigig")

if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI is missing from the .env file")

# Keep a single shared MongoDB client for the app lifecycle.
client = MongoClient(
    MONGODB_URI,
    serverSelectionTimeoutMS=5000,
)

db = client[DATABASE_NAME]
users_collection = db["users"]


def connect_to_mongodb():
    """Verify MongoDB health and ensure email uniqueness at the database layer."""
    try:
        client.admin.command("ping")
        users_collection.create_index("email", unique=True)
        print("MongoDB connected successfully.")
    except PyMongoError as exc:
        raise RuntimeError("Could not connect to MongoDB.") from exc
