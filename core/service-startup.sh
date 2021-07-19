#!/bin/bash
bash ./wait-for-it $POSTGRES_HOST:$POSTGRES_PORT -t 300
alembic upgrade head
gunicorn --bind=:5000 --timeout=300 app:app
