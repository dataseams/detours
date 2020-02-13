"""Module for all data models logic."""
from datetime import time

from sqlalchemy import (
    Column,
    DateTime,
    Date,
    Time,
    ForeignKey,
    Integer,
    String,
    func,
)
from sqlalchemy.orm import backref, relationship

from .database import Base


class User(Base):
    """Add user entity model."""

    __tablename__ = "user"
    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    middle_name = Column(String)
    last_name = Column(String)


class City(Base):
    """Add city entity model."""

    __tablename__ = "city"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    state = Column(String)
    country = Column(String)


class TimeOfDay(Base):
    """Add time of day entity model."""

    EARLY_MORNING = (time(1, 0, 0), time(4, 59, 59))
    MORNING = (time(5, 0, 0), time(8, 59, 59))
    NOON = (time(9, 0, 0), time(12, 59, 59))
    AFTERNOON = (time(13, 0, 0), time(16, 59, 59))
    EVENING = (time(17, 0, 0), time(20, 59, 59))
    NIGHT = (time(21, 0, 0), time(12, 59, 59))

    __tablename__ = "time_of_day"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    start_time = Column(Time)
    end_time = Column(Time)


class Trip(Base):
    """Add trip entity model."""

    __tablename__ = "trip"
    id = Column(Integer, primary_key=True)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    start_time = Column(Integer, ForeignKey("time_of_day.id"))
    end_time = Column(Integer, ForeignKey("time_of_day.id"))
    city_id = Column(Integer, ForeignKey("city.id"))
    user_id = Column(Integer, ForeignKey("user.id"))


class TripDay(Base):
    """Add trip day entity model."""

    __tablename__ = "trip_day"
    id = Column(Integer, primary_key=True)
    date = Column(Date)
    trip_id = Column(Integer, ForeignKey("trip.id"))


class MaterialIcon(Base):
    """Add material icon values."""

    HOTEL = "hotel"
    RESTAURANT = "restaurant"
    BICYCLE = "directions_bike"

    __tablename__ = "material_icon"
    id = Column(Integer, primary_key=True)
    name = Column(String)


class ActivityType(Base):
    """Add activity type entity model."""

    __tablename__ = "activity_type"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    material_icon = Column(String)


class Activity(Base):
    """Add activity entity model."""

    __tablename__ = "activity"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    title = Column(String)
    description = Column(String)
    type_id = Column(Integer, ForeignKey("activity_type.id"))


class ItineraryItem(Base):
    """Class to define an itinerary item."""

    __tablename__ = "itinerary_item"
    id = Column(Integer, primary_key=True)
    order = Column(Integer)
    trip_day_id = Column(Integer, ForeignKey("trip_day.id"))
    activity_id = Column(Integer, ForeignKey("activity.id"))
