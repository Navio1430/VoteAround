from flask import Blueprint, render_template, request
from models import db, Project
from datetime import timedelta
from utils.time import get_utc_time

projects = Blueprint("projects", __name__)

PROJECT_EXPIRATION_TIME = timedelta(days=30)
MAX_RADIUS_LENGTH = 5000  # Meters
MAX_LABEL_LENGTH = 32


@projects.route("/", methods=["GET"])
def index():
    return render_template("projects/projects.html")


@projects.route("/create", methods=["GET", "POST"])
def create():
    if request.method == "POST":
        try:
            label = request.form.get("label")
            description = request.form.get("description")
            longitude = float(request.form.get("longitude"))
            latitude = float(request.form.get("latitude"))
            radius = float(request.form.get("radius"))
        except ValueError:
            return "<h2>Invalid inputs</h2>"

        if len(label) > MAX_LABEL_LENGTH:
            return "<h2>Label is too long (max 32 characters)</h2>"

        if radius <= 0:
            return "<h2>Radius must be larger than 0</h2>"

        if latitude < -90 or 90 > latitude:
            return "<h2>Latitude is invalid</h2>"

        if longitude < -180 or 180 > longitude:
            return "<h2>Longitude is invalid</h2>"

        radius = MAX_RADIUS_LENGTH if radius > MAX_RADIUS_LENGTH else radius

        end_time = get_utc_time(PROJECT_EXPIRATION_TIME)

        db.session.add(
            Project(label, description, latitude, longitude, radius, end_time)
        )
        db.session.commit()

        return "<h2>Successfully created project</h2>"

        # return redirect("#")
    else:
        return render_template("projects/create.html")
