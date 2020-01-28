"""Run the app."""
from flask_graphql import GraphQLView
from flask import Flask

from database import db_session, init_db
from schema import schema

app = Flask(__name__)

app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True),
)


@app.teardown_appcontext
def shutdown_session(exception=None):
    """Stop database session when flask shutdown."""
    db_session.remove()


if __name__ == "__main__":
    init_db()
    app.run()
