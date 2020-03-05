"""Activity schema."""
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType

from .. import models


class Activity(SQLAlchemyObjectType):
    """Activity entity."""

    class Meta:
        """Meta data."""

        model = models.Activity
        interfaces = (relay.Node,)
