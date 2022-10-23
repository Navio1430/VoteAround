from flask import Blueprint, render_template, redirect, url_for, request
from models import db, Project, User
from datetime import timedelta
from utils.time import get_utc_time
from utils.auth import login_required
from utils.uuid import hex_to_uuid_bytes

projects = Blueprint("projects", __name__)

PROJECT_EXPIRATION_TIME = timedelta(days=30)
MAX_RADIUS_LENGTH = 5000  # Meters


@projects.route("/", methods=["GET"])
@login_required(User)
def index(user):
    return render_template("projects/projects.html")


@projects.route("/<project_id>", methods=["GET"])
@login_required(User)
def project(user, project_id):
    try:
        uuid = hex_to_uuid_bytes(project_id)
    except ValueError:
        return render_template("bug/bug.html", error_message="Podane ID ma niepoprawny format")

    project_entry = Project.query.filter_by(uuid=uuid).first()

    if not project_entry.is_in_range(user.pos):
        return redirect(url_for("projects.index"))

    if not project_entry:
        return render_template("bug/bug.html", error_message="Nie znaleziono projektu o podanym ID")

    return render_template("projects/project.html", project=project_entry)


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
            render_template("bug/bug.html", error_message="Podane wartości mają niepoprawny format")

        if len(label) < 5:
            return render_template("bug/bug.html", error_message="Nazwa musi zawierać przynajmniej 5 znaków")

        if len(label) > 32:
            return render_template("bug/bug.html", error_message="Nazwa może zawierać maksymalnie 32 znaki")

        if radius <= 0:
            return render_template("bug/bug.html", error_message="Zasięg projektu musi być większy od zera")

        if -90 > latitude or latitude > 90:
            return render_template("bug/bug.html", error_message="Szerokość geograficzna ma niepoprawną wartość")

        if -180 > longitude or longitude > 180:
            return render_template("bug/bug.html", error_message="Długość geograficzna ma niepoprawną wartość")

        radius = MAX_RADIUS_LENGTH if radius > MAX_RADIUS_LENGTH else radius

        start_time = get_utc_time()
        end_time = start_time + PROJECT_EXPIRATION_TIME.total_seconds()

        project = Project(
            label, user, description, latitude, longitude, radius, start_time, end_time
        )
        db.session.add(project)
        user.authored += project.uuid
        db.session.commit()

        return redirect(url_for("projects.index"))
    else:
        return render_template("projects/create.html")
