from flask import Blueprint, render_template

events = Blueprint("events", __name__)


@events.route("/", methods=["GET"])
def index():
    return render_template("events/events.html")
