"""Place schema."""
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType

from .. import models


class Place(SQLAlchemyObjectType):
    """Place entity."""

    class Meta:
        """Meta class."""

        model = models.Place
        interfaces = (relay.Node,)
