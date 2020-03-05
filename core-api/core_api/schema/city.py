"""City schema."""
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType

from .. import models


class City(SQLAlchemyObjectType):
    """City entity."""

    class Meta:
        """Meta data."""

        model = models.City
        interfaces = (relay.Node,)
