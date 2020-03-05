"""Module for database logic."""
from datetime import date

from sqlalchemy.ext.declarative import declarative_base

from .config import engine, db_session

Base = declarative_base()
Base.query = db_session.query_property()


def init_db():
    """Import modules that need to be registered properly on the metadata."""
    from . import models

    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    # Create the fixtures
    time_of_day = {}
    for k, v in models.TimeOfDay.VALUES.items():
        time_of_day[k] = models.TimeOfDay(
            name=k, start_time=v[0], end_time=v[1]
        )
        db_session.add(time_of_day[k])
    db_session.commit()

    activity_types = {}
    for k, v in models.ActivityType.VALUES.items():
        activity_types[k] = models.ActivityType(name=k, material_icon=v)
        db_session.add(activity_types[k])
    db_session.commit()

    places = {
        "maison_natale": models.Place(
            name="Maison Natale Bernard Buffet",
            description="Featuring a low-key art deco style, this conservative"
            " hotel is a 1-minute walk from the Cadet metro "
            "station.",
        ),
        "pain_quotidien": models.Place(
            name="Le Pain Quotidien",
            description="A historical landmark with breakfast experience.",
        ),
        "holland_bikes": models.Place(
            name="Le Soufle",
            description="A self-guided bike tour in the old city.",
        ),
        "le_soufle": models.Place(
            name="Le Soufle",
            description="A local favorite, known for its generosity and tasty "
            "souffles.",
        ),
    }
    for v in places.values():
        db_session.add(v)
    db_session.commit()

    activities = [
        models.Activity(
            name="wake-up",
            place=places["maison_natale"],
            activity_type=activity_types["hotel"],
        ),
        models.Activity(
            name="breakfast",
            place=places["pain_quotidien"],
            activity_type=activity_types["food"],
        ),
        models.Activity(
            name="biking",
            place=places["holland_bikes"],
            activity_type=activity_types["tour"],
        ),
        models.Activity(
            name="lunch",
            place=places["le_soufle"],
            activity_type=activity_types["food"],
        ),
        models.Activity(
            name="sleep",
            place=places["maison_natale"],
            activity_type=activity_types["hotel"],
        ),
    ]
    for v in activities:
        db_session.add(v)
    db_session.commit()

    new_york = models.City(
        name="New York", state="New York", state_abbr="NY", country="USA"
    )
    db_session.add(new_york)
    frisco = models.City(
        name="San Francisco",
        state="California",
        state_abbr="CA",
        country="USA",
    )
    db_session.add(frisco)
    paris = models.City(
        name="Paris", state="", state_abbr="", country="France"
    )
    db_session.add(paris)
    barcelona = models.City(
        name="Barcelona", state="", state_abbr="", country="Spain"
    )
    db_session.add(barcelona)
    db_session.commit()

    shahbaz = models.Traveler(first_name="Shahboo", last_name="Khan")
    db_session.add(shahbaz)
    db_session.commit()

    shahbaz_paris_trip_2019 = models.TripPlan(
        start_date=date(2019, 1, 1),
        end_date=date(2019, 1, 4),
        start_time_of_day=time_of_day["morning"],
        # end_time_of_day=time_of_day["evening"],
        city=paris,
        traveler=shahbaz,
    )
    db_session.add(shahbaz_paris_trip_2019)
    db_session.commit()

    daily_plans = [
        models.DailyPlan(
            date=date(2019, 1, 1), trip_plan=shahbaz_paris_trip_2019
        ),
        models.DailyPlan(
            date=date(2019, 1, 2), trip_plan=shahbaz_paris_trip_2019
        ),
        models.DailyPlan(
            date=date(2019, 1, 3), trip_plan=shahbaz_paris_trip_2019
        ),
        models.DailyPlan(
            date=date(2019, 1, 4), trip_plan=shahbaz_paris_trip_2019
        ),
    ]
    for v in daily_plans:
        db_session.add(v)
    db_session.commit()

    for i, v in enumerate(activities):
        db_session.add(
            models.PlanItem(order=i + 1, daily_plan=daily_plans[0], activity=v)
        )
    for i, v in enumerate(daily_plans[1:]):
        db_session.add(
            models.PlanItem(order=1, daily_plan=v, activity=activities[0])
        )
    db_session.commit()

    import json
    import os

    this_path = os.path.abspath(os.path.dirname(__file__))
    json_path = os.path.join(this_path, "models/survey_result_template.json")
    with open(json_path, "r") as f:
        survey_result_template = json.loads(f.read())

    db_session.add(
        models.SurveyResponse(traveler_id=1, json=survey_result_template)
    )
    db_session.commit()
