"""GraphQL schema module."""
from graphene import ObjectType, String, Schema
from flask import Flask
from flask_graphql import GraphQLView


class Query(ObjectType):
    """Define the schema field with a single argument `name`."""

    hello = String(name=String(default_value="stranger"))
    goodbye = String()

    def resolve_hello(root, info, name):
        """Take GraphQL context (root, info) and arg (name).

        Return the query Response back to the client.

        """
        return f"Hello {name}!"

    def resolve_goodbye(root, info):
        """Take context and return goodbye message."""
        return "See ya."


schema = Schema(query=Query)

app = Flask(__name__)


@app.route("/test")
def test_endpoint():
    """Test."""
    return "ok"


app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True),
)
