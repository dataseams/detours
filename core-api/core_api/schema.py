"""GraphQL schema."""
import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType

from . import models
from .config import db_session


class TimeOfDay(SQLAlchemyObjectType):
    """TimeOfDay entity."""

    class Meta:
        """Meta data."""

        model = models.TimeOfDay
        interfaces = (relay.Node,)


class ActivityType(SQLAlchemyObjectType):
    """ActivityType entity."""

    class Meta:
        """Meta class."""

        model = models.ActivityType
        interfaces = (relay.Node,)


class Place(SQLAlchemyObjectType):
    """Place entity."""

    class Meta:
        """Meta class."""

        model = models.Place
        interfaces = (relay.Node,)


class Activity(SQLAlchemyObjectType):
    """Activity entity."""

    class Meta:
        """Meta data."""

        model = models.Activity
        interfaces = (relay.Node,)


class City(SQLAlchemyObjectType):
    """City entity."""

    class Meta:
        """Meta data."""

        model = models.City
        interfaces = (relay.Node,)


class Traveler(SQLAlchemyObjectType):
    """Traveler entity."""

    class Meta:
        """Meta data."""

        model = models.Traveler
        interfaces = (relay.Node,)


class TripPlan(SQLAlchemyObjectType):
    """Trip entity."""

    class Meta:
        """Meta class."""

        model = models.TripPlan
        interfaces = (relay.Node,)


class DailyPlan(SQLAlchemyObjectType):
    """TripDay entity."""

    class Meta:
        """Meta class."""

        model = models.DailyPlan
        interfaces = (relay.Node,)


class PlanItem(SQLAlchemyObjectType):
    """ItineraryItem entity."""

    class Meta:
        """Meta class."""

        model = models.PlanItem
        interfaces = (relay.Node,)


class AddTraveler(graphene.Mutation):
    """Create mutation to add a new traveler."""

    traveler = graphene.Field(
        lambda: Traveler, description="Traveler created by this mutation."
    )

    class Arguments:
        """Declare input arguments."""

        first_name = graphene.String(
            required=True, description="The traveler's first name."
        )

    def mutate(self, info, first_name):
        """Add traveler to the database."""
        traveler = models.Traveler(first_name=first_name)
        db_session.add(traveler)
        db_session.commit()

        return AddTraveler(traveler=traveler)


class Mutation(graphene.ObjectType):
    """Update database entities."""

    add_traveler = AddTraveler.Field()


class Query(graphene.ObjectType):
    """Graphene root query node."""

    node = relay.Node.Field()
    # Allow only single column sorting
    get_all_trips = SQLAlchemyConnectionField(TripPlan)
    # Allow sorting over multiple columns, by default over the primary key
    get_all_cities = SQLAlchemyConnectionField(City, sort=City.sort_argument())
    get_all_travelers = SQLAlchemyConnectionField(Traveler)


schema = graphene.Schema(query=Query, mutation=Mutation)
