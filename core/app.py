"""Run the app."""
import json
import logging
import os

import stripe
from core_api.config import db_session
from core_api.models import SurveyResponse
from core_api.schema import schema
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_graphql import GraphQLView

log = logging.getLogger(__name__)

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")
stripe_endpoint_secret = os.environ.get("STRIPE_ENDPOINT_SECRET")

app = Flask(__name__)
CORS(app)


@app.route("/test")
def liveness():
    """Add liveness probe."""
    return "Alive"


app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True),
)


@app.teardown_appcontext
def shutdown_session(exception=None):
    """Stop database session when flask shutdown."""
    db_session.remove()


@app.route("/stripe-webhook", methods=["POST"])
def webhook():
    """Save strip session information to database."""
    event = None
    payload = request.data

    try:
        event = json.loads(payload)
    except Exception as e:
        log.warn("⚠️  Webhook error while parsing basic request." + str(e))
        return jsonify(success=False)
    if stripe_endpoint_secret:
        # Only verify the event if there is an endpoint secret defined
        # Otherwise use the basic event deserialized with json
        sig_header = request.headers.get("stripe-signature")
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, stripe_endpoint_secret
            )
        except stripe.error.SignatureVerificationError as e:
            log.warn("⚠️  Webhook signature verification failed." + str(e))
            return jsonify(success=False)

    # Handle the event
    if event and event["type"] == "checkout.session.completed":
        checkout_session = event["data"][
            "object"
        ]  # contains a checkout_session
        log.info(
            "checkout session for {} completed".format(
                checkout_session["client_reference_id"]
            )
        )
        if checkout_session["payment_status"] == "paid":
            log.info(
                "Payment for {} succeeded".format(
                    checkout_session["client_reference_id"]
                )
            )
            if checkout_session["client_reference_id"]:
                SurveyResponse.mark_survey_as_paid(
                    checkout_session["client_reference_id"],
                    checkout_session["id"],
                )
            else:
                log.info(
                    "Invalid client_reference_id for session {}".format(
                        checkout_session["id"]
                    )
                )
                return jsonify(success=False)

    else:
        # Unexpected event type
        log.warn(
            "Unhandled event type {}".format(event["type"] if event else None)
        )

    return jsonify(success=True)
