from flask import Blueprint, render_template, redirect, url_for, request
from models import db, Project, User
from datetime import timedelta
from utils.time import get_utc_time
from utils.auth import login_required

projects = Blueprint("projects", __name__)

PROJECT_EXPIRATION_TIME = timedelta(days=30)
MAX_RADIUS_LENGTH = 5000  # Meters
MAX_LABEL_LENGTH = 32


@projects.route("/", methods=["GET"])
@login_required(User)
def index(user):
    return render_template("projects/projects.html")


@projects.route("/create", methods=["GET", "POST"])
@login_required(User)
def create(user):
    if request.method == "POST":
        try:
            label = request.form.get("label")
            description = request.form.get("description")
            longitude = float(request.form.get("longitude"))
            latitude = float(request.form.get("latitude"))
            radius = float(request.form.get("radius"))
        except ValueError:
            return "<h2>Invalid inputs</h2>"

        if len(label) < 5:
            return "<h2>Label must contain at least 5 characters</h2>"

        if len(label) > MAX_LABEL_LENGTH:
            return "<h2>Label is too long (max 32 characters)</h2>"

        if radius <= 0:
            return "<h2>Radius must be larger than 0</h2>"

        if -90 > latitude or latitude > 90:
            return "<h2>Latitude is invalid</h2>"

        if -180 > longitude or longitude > 180:
            return "<h2>Longitude is invalid</h2>"

        radius = MAX_RADIUS_LENGTH if radius > MAX_RADIUS_LENGTH else radius

        start_time = get_utc_time()
        end_time = start_time + PROJECT_EXPIRATION_TIME.total_seconds()

        db.session.add(
            Project(label, description, latitude, longitude, radius, start_time, end_time)
        )
        db.session.commit()

        return redirect(url_for("projects.index"))
    else:
        return render_template("projects/create.html")
