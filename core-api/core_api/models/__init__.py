"""Module for all data models logic."""
from datetime import time
from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    Date,
    Time,
    ForeignKey,
    Integer,
    String,
    JSON,
)
from sqlalchemy.orm import relationship, backref

from ..database import Base


class TimeOfDay(Base):
    """Add time of day entity model."""

    VALUES = {
        "early_moring": (time(1, 0, 0), time(4, 59, 59)),
        "morning": (time(5, 0, 0), time(8, 59, 59)),
        "noon": (time(9, 0, 0), time(12, 59, 59)),
        "afternoon": (time(13, 0, 0), time(16, 59, 59)),
        "evening": (time(17, 0, 0), time(20, 59, 59)),
        "night": (time(21, 0, 0), time(12, 59, 59)),
    }

    __tablename__ = "time_of_day"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    start_time = Column(Time)
    end_time = Column(Time)


class ActivityType(Base):
    """Add activity type entity model."""

    # key = category, value = material icon code
    VALUES = {
        "hotel": "hotel",
        "food": "restaurant",
        "tour": "directions_bike",
    }

    __tablename__ = "activity_type"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    material_icon = Column(String)


class Place(Base):
    """Add place entity model."""

    __tablename__ = "place"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)


class Activity(Base):
    """Add activity entity model."""

    __tablename__ = "activity"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    place_id = Column(Integer, ForeignKey("place.id"))
    type_id = Column(Integer, ForeignKey("activity_type.id"))

    place = relationship("Place")
    activity_type = relationship("ActivityType")


class City(Base):
    """Add city entity model."""

    __tablename__ = "city"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    state = Column(String)
    state_abbr = Column(String)
    country = Column(String)


class Traveler(Base):
    """Add traveler entity model."""

    __tablename__ = "traveler"
    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    middle_name = Column(String)
    last_name = Column(String)
    time_stamp = Column(DateTime, default=datetime.now())


class TripPlan(Base):
    """Add trip entity model."""

    __tablename__ = "trip_plan"
    id = Column(Integer, primary_key=True)
    start_date = Column(Date)
    end_date = Column(Date)
    start_time = Column(Integer, ForeignKey("time_of_day.id"))
    # end_time = Column(Integer, ForeignKey("end_time_of_day.id"))
    city_id = Column(Integer, ForeignKey("city.id"))
    traveler_id = Column(Integer, ForeignKey("traveler.id"))

    start_time_of_day = relationship("TimeOfDay")
    # end_time_of_day = relationship("TimeOfDay")
    city = relationship("City")
    traveler = relationship("Traveler")


class DailyPlan(Base):
    """Add trip day entity model."""

    __tablename__ = "daily_plan"
    id = Column(Integer, primary_key=True)
    date = Column(Date)
    trip_plan_id = Column(Integer, ForeignKey("trip_plan.id"))

    trip_plan = relationship(
        "TripPlan",
        backref=backref("daily_plans", uselist=True, cascade="delete,all"),
    )


class PlanItem(Base):
    """Class to define an itinerary item."""

    __tablename__ = "plan_item"
    id = Column(Integer, primary_key=True)
    order = Column(Integer)
    daily_plan_id = Column(Integer, ForeignKey("daily_plan.id"))
    activity_id = Column(Integer, ForeignKey("activity.id"))

    daily_plan = relationship(
        "DailyPlan",
        backref=backref("plan_items", uselist=True, cascade="delete,all"),
    )
    activity = relationship(Activity)


class SurveyResponse(Base):
    """Add survey response entity model."""

    __tablename__ = "survey_response"
    id = Column(Integer, primary_key=True)
    traveler_id = Column(Integer, ForeignKey("traveler.id"))
    json = Column(JSON)
    time_stamp = Column(DateTime, default=datetime.now())

    traveler = relationship(
        "Traveler",
        backref=backref("survey_response", uselist=True, cascade="delete,all"),
    )
