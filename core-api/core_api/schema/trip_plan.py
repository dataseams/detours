"""TripPlan schema."""
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType

from .. import models


class TripPlan(SQLAlchemyObjectType):
    """Trip entity."""

    class Meta:
        """Meta class."""

        model = models.TripPlan
        interfaces = (relay.Node,)
