"""Configuration variables."""
import os

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DATABASE = {
    "user": os.getenv("POSTGRES_USER", "sam"),
    "password": os.getenv("POSTGRES_PASSWORD", "abcd"),
    "host": os.getenv("POSTGRES_HOST", "localhost"),
    "port": os.getenv("POSTGRES_PORT", "5432"),
    "name": os.getenv("POSTGRES_DB", "detours"),
}
DB_URL = (
    f"postgres://{DATABASE['user']}:{DATABASE['password']}"
    f"@{DATABASE['host']}:{DATABASE['port']}/{DATABASE['name']}"
)
engine = create_engine(DB_URL, convert_unicode=True)
db_session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine)
)
Base = declarative_base()
Base.query = db_session.query_property()
