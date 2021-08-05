"""Module for all data models logic."""
from datetime import datetime, time

from graphql_relay.node.node import from_global_id
from sqlalchemy import (
    ARRAY,
    Boolean,
    CheckConstraint,
    Column,
    Date,
    DateTime,
    ForeignKey,
    Integer,
    JSON,
    Numeric,
    String,
    Time,
)
from sqlalchemy.dialects.postgresql import MONEY
from sqlalchemy.orm import backref, relationship

from .config import Base, db_session


class TableValues(dict):
    """Creates create attributes for initial table values for easy access."""

    def __init__(self, values: dict):
        for k, v in values.items():
            if hasattr(self, k):
                raise KeyError(f"{k} attribute cannot be created.")
            setattr(self, k, v)
            self.__setitem__(k, v)


class TimeOfDay(Base):
    """Define a time of day entity."""

    VALUES = TableValues(
        {
            "early_moring": (time(1, 0, 0), time(4, 59, 59)),
            "morning": (time(5, 0, 0), time(8, 59, 59)),
            "noon": (time(9, 0, 0), time(12, 59, 59)),
            "afternoon": (time(13, 0, 0), time(16, 59, 59)),
            "evening": (time(17, 0, 0), time(20, 59, 59)),
            "night": (time(21, 0, 0), time(12, 59, 59)),
        }
    )

    __tablename__ = "time_of_day"
    id = Column(Integer, primary_key=True)
    name = Column(String(20))
    start_time = Column(Time)
    end_time = Column(Time)


class City(Base):
    """Define a city entity."""

    VALUES = [
        {
            "code": "LA",
            "name": "Los Angeles",
            "state": "California",
            "state_abbr": "CA",
            "country": "USA",
            "latitude": 34.0619,
            "longitude": -118.2420,
            "spending_per_day": 190,
        },
        {
            "code": "SF",
            "name": "San Francisco",
            "state": "California",
            "state_abbr": "CA",
            "country": "USA",
            "latitude": 37.9296,
            "longitude": -122.4279,
            "spending_per_day": 365,
        },
        {
            "code": "SD",
            "name": "San Diego",
            "state": "California",
            "state_abbr": "CA",
            "country": "USA",
            "latitude": 32.7468,
            "longitude": -117.1612,
            "spending_per_day": 161,
        },
        {
            "code": "NYC",
            "name": "New York City",
            "state": "New York",
            "state_abbr": "NY",
            "country": "USA",
            "latitude": 41.8456,
            "longitude": -73.9249,
            "spending_per_day": 144,
        },
        {
            "code": "CHI",
            "name": "Chicago",
            "state": "Illinois",
            "state_abbr": "IL",
            "country": "USA",
            "latitude": 42.5780,
            "longitude": -87.7352,
            "spending_per_day": 221,
        },
    ]

    __tablename__ = "city"
    id = Column(Integer, primary_key=True)
    code = Column(String(3))
    name = Column(String(50))
    state = Column(String(20))
    state_abbr = Column(String(2))
    country = Column(String(50))
    latitude = Column(Numeric(precision=10, scale=6))
    longitude = Column(Numeric(precision=10, scale=6))
    spending_per_day = Column(MONEY, default=176)


class SurveyResponse(Base):
    """Define a personality survey response entity."""

    __tablename__ = "survey_response"
    id = Column(Integer, primary_key=True)
    traveler_email = Column(String(100))
    json = Column(JSON)
    time_stamp = Column(DateTime, default=datetime.now())
    checkout_id = Column(String(100))
    payment_status = Column(String(6), default="unpaid")

    @classmethod
    def mark_survey_as_paid(cls, survey_response_id: str, checkout_id: str):
        """Mark survey as paid.

        Parameters
        ----------
        survey_response_id: str
            Base64 encoded survey response id
        checkout_id: str
            Stripe checkout id
        """
        local_survey_response_id = int(from_global_id(survey_response_id)[1])
        survey_response = cls.query.get(local_survey_response_id)
        survey_response.checkout_id = checkout_id
        survey_response.payment_status = "paid"
        db_session.commit()


class TripPlan(Base):
    """Define a trip plan entity."""

    __tablename__ = "trip_plan"
    id = Column(Integer, primary_key=True)
    survey_response_id = Column(Integer, ForeignKey("survey_response.id"))
    start_date = Column(Date)
    end_date = Column(Date)
    start_time = Column(Integer, ForeignKey("time_of_day.id"))
    # end_time = Column(Integer, ForeignKey("end_time_of_day.id"))
    city_id = Column(Integer, ForeignKey("city.id"))
    spending_per_day = Column(MONEY)
    hours_saved = Column(String(50))
    interests_matched = Column(ARRAY(String(100)))
    time_stamp = Column(DateTime, default=datetime.now())

    start_time_of_day = relationship("TimeOfDay")
    # end_time_of_day = relationship("TimeOfDay")
    city = relationship("City")
    daily_plans = relationship("DailyPlan", back_populates="trip_plan")
    survey_response = relationship(
        "SurveyResponse",
        backref=backref("trip_plans", uselist=True, cascade="delete,all"),
    )


class DailyPlan(Base):
    """Define a day's plan in the trip."""

    __tablename__ = "daily_plan"
    id = Column(Integer, primary_key=True)
    date = Column(Date)
    trip_plan_id = Column(Integer, ForeignKey("trip_plan.id"))

    trip_plan = relationship("TripPlan", back_populates="daily_plans")
    plan_items = relationship("PlanItem", back_populates="daily_plan")


class PlanItem(Base):
    """Define an itinerary item."""

    __tablename__ = "plan_item"
    id = Column(Integer, primary_key=True)
    order = Column(Integer)
    daily_plan_id = Column(Integer, ForeignKey("daily_plan.id"))
    activity_id = Column(Integer, ForeignKey("activity.id"))

    daily_plan = relationship("DailyPlan", back_populates="plan_items")


class Activity(Base):
    """Define an activity entity."""

    __tablename__ = "activity"
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    place_id = Column(Integer, ForeignKey("place.id"))
    activity_type_id = Column(Integer, ForeignKey("activity_type.id"))

    plan_items = relationship(
        "PlanItem",
        backref=backref("activity", uselist=False, cascade="delete,all"),
    )


class ActivityType(Base):
    """Define an activity type entity."""

    # key = category, value = material icon code
    VALUES = TableValues(
        {
            "hotel": "hotel",
            "food": "restaurant",
            "tour": "directions_bike",
            "museum": "museum",
            "historic_building": "account_balance",
            "park": "nature_people",
            "beach": "beach_access",
            "theater": "theaters",
        }
    )

    __tablename__ = "activity_type"
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    material_icon = Column(String(50))

    activities = relationship(
        "Activity",
        backref=backref("activity_type", uselist=False, cascade="delete,all"),
    )

    @classmethod
    def get_all(cls):
        """Get all activity types and represent as TableValues."""
        db_activity_types = cls.query.all()
        activity_types = {x.name: x for x in db_activity_types}
        activity_types_obj = TableValues(activity_types)
        return activity_types_obj


class Place(Base):
    """Define a place entity."""

    __tablename__ = "place"
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    description = Column(String(500))
    address = Column(String(200))
    locality = Column(String(200))
    zipcode = Column(String(10))
    latitude = Column(Numeric(precision=10, scale=6))
    longitude = Column(Numeric(precision=10, scale=6))

    activities = relationship(
        "Activity",
        backref=backref("place", uselist=False, cascade="delete,all"),
    )


class User(Base):
    """Define a user entity."""

    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    email = Column(String(100), unique=True, nullable=False)
    gender = Column(
        String(20),
        CheckConstraint(
            "COALESCE(gender, 'Their') in ('Her', 'Him', 'Their')"
        ),
    )
    age = Column(Integer, CheckConstraint("COALESCE(age, 0) >= 0"))
    wants_promotions_and_tips = Column(Boolean, default=True)
    wants_reminders = Column(Boolean, default=True)
