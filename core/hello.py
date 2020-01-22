"""GraphQL implementation example module."""
import graphene


class Query(graphene.ObjectType):
    """Create a sample GraphQL class."""

    hello = graphene.String(name=graphene.String(default_value="World"))

    def resolve_hello(self, info, name):
        """Create an example query resolver."""
        return "Hello " + name


schema = graphene.Schema(query=Query)
result = schema.execute("{ hello }")
print(result.data["hello"])  # 'Hello world'
