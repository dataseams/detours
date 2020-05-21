"""TimeOfDay schema."""
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType

from .. import models


class TimeOfDay(SQLAlchemyObjectType):
    """TimeOfDay entity."""

    class Meta:
        """Meta data."""

        model = models.TimeOfDay
        interfaces = (relay.Node,)
