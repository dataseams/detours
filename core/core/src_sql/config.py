"""Configuration variables."""
import os

DATABASES = {
    "default": {
        "user": os.getenv("POSTGRES_USER"),
        "password": os.getenv("POSTGRES_PASSWORD"),
        "host": os.getenv("POSTGRES_HOST"),
        "port": os.getenv("POSTGRES_PORT"),
        "name" = os.getenv("POSTGRES_DB"),
    }
}
# "postgres+pg1200:///sam:myP@ss@postgres-service:5432/detours"
DB_URL = (
    f"postgres+pg1200:///{DATABASES["user"]}:{DATABASES["password"]}@"
    f"{DATABASES["host"]}:{DATABASES["port"]}//{DATABASES["name"]}"
)
