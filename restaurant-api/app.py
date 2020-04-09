"""Run the app."""
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/test")
def liveness():
    """Add liveness probe."""
    return "Alive"
