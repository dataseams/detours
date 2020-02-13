"""GraphQL schema."""
import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType

import models


class User(SQLAlchemyObjectType):
    """User entity."""

    class Meta:
        """Meta data."""

        model = models.User
        interfaces = (relay.Node,)


class City(SQLAlchemyObjectType):
    """City entity."""

    class Meta:
        """Meta data."""

        model = models.City
        interfaces = (relay.Node,)


class TimeOfDay(SQLAlchemyObjectType):
    """TimeOfDay entity."""

    class Meta:
        """Meta data."""

        model = models.TimeOfDay
        interfaces = (relay.Node,)


class Trip(SQLAlchemyObjectType):
    """Trip entity."""

    class Meta:
        """Meta class."""

        model = models.Trip
        interfaces = (relay.Node,)


class TripDay(SQLAlchemyObjectType):
    """TripDay entity."""

    class Meta:
        """Meta class."""

        model = models.TripDay
        interfaces = (relay.Node,)


class MaterialIcon(SQLAlchemyObjectType):
    """MaterialIcon entity."""

    class Meta:
        """Meta class."""

        model = models.MaterialIcon
        interfaces = (relay.Node,)


class ActivityType(SQLAlchemyObjectType):
    """ActivityType entity."""

    class Meta:
        """Meta class."""

        model = models.ActivityType
        interfaces = (relay.Node,)


class Activity(SQLAlchemyObjectType):
    """Activity entity."""

    class Meta:
        """Meta data."""

        model = models.Activity
        interfaces = (relay.Node,)


class ItineraryItem(SQLAlchemyObjectType):
    """ItineraryItem entity."""

    class Meta:
        """Meta class."""

        model = models.ItineraryItem
        interfaces = (relay.Node,)


class Query(graphene.ObjectType):
    """Graphene root node."""

    node = relay.Node.Field()
    # Allow only single column sorting
    all_trips = SQLAlchemyConnectionField(Trip, sort=Trip.sort_argument())
    # Allow sorting over multiple columns, by default over the primary key
    all_activities = SQLAlchemyConnectionField(Activity)
    # Disable sorting over this field
    all_trip_days = SQLAlchemyConnectionField(TripDay, sort=None)


schema = graphene.Schema(query=Query, types=[Trip, Activity, TripDay])
