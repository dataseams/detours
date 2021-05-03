"""Run the app."""
from flask_graphql import GraphQLView
from flask import Flask
from flask_cors import CORS

from .core_api.config import db_session
from .core_api.models import sync_db
from .core_api.schema import schema

app = Flask(__name__)
CORS(app)


@app.route("/test")
def liveness():
    """Add liveness probe."""
    return "Alive"


app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True),
)


@app.teardown_appcontext
def shutdown_session(exception=None):
    """Stop database session when flask shutdown."""
    db_session.remove()


sync_db()
