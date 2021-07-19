#!/bin/bash
bash ./wait-for-it $POSTGRES_HOST:5432 -t 300
alembic upgrade head
gunicorn --bind=:5000 --timeout=300 app:app
