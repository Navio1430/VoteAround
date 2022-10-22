from flask import Blueprint, jsonify, request
from utils.auth import login_required
from models import User, Project, db
from utils.uuid import bytes_to_uuid_hex, hex_to_uuid_bytes

api = Blueprint("api", __name__)

MAX_LIMIT = 50


@api.route("/user/delete", methods=["POST"])
@login_required(User)
def user_delete_account(user):
    data = request.get_json()
    password = data.get("password", "")

    if not user.check_password(password):
        return jsonify({"success": False})

    db.session.query(User).filter(User.uuid == user.uuid).delete()
    db.session.commit()

    return jsonify({"success": True})


@api.route("/user/edit", methods=["POST"])
@login_required(User)
def user_edit_account(user):
    data = request.get_json()
    password = data.get("password", "")

    if not user.check_password(password):
        return jsonify({"success": False})

    new_password = data.get("new_password")
    if new_password:
        user.set_password(new_password)

    new_username = data.get("new_username")
    if new_username:
        user.username = new_username

    new_latitude = data.get("new_latitude")
    if new_latitude:
        user.latitude = new_latitude

    new_longitude = data.get("new_longitude")
    if new_longitude:
        user.longitude = new_longitude

    db.session.commit()

    return jsonify({"success": True})


@api.route("/projects/project", methods=["GET"])
@login_required(User)
def projects_project(user):
    uuid_hex = request.args.get("id")

    try:
        uuid = hex_to_uuid_bytes(uuid_hex)
    except ValueError:
        return "{}"

    project = db.session.query(Project).filter(Project.uuid == uuid).first()

    if not project:
        return "{}"

    data = {
        "uuid": uuid_hex,
        "label": project.label,
        "description": project.description,
        "latitude": project.latitude,
        "longitude": project.longitude,
        "radius": project.radius,
        "positive_votes": int(project.positive_votes_count),
        "negative_votes": int(project.negative_votes_count),
        "user_vote": project.user_vote_status(user.uuid),
    }

    return jsonify(data)


@api.route("/projects/popular", methods=["GET"])
@login_required(User)
def projects_popular(user):
    index = request.args.get("index", default=0, type=int)
    limit = request.args.get("limit", default=10, type=int)

    limit = min(limit, MAX_LIMIT)

    data = []

    projects = db.session.query(Project).all()

    in_range = filter(
        lambda project: project.is_in_range(user.pos),
        projects,
    )

    filtered = sorted(
        in_range, key=lambda project: project.positive_votes_count, reverse=True
    )[index : index + limit]

    data = [
        {
            "uuid": bytes_to_uuid_hex(project.uuid),
            "label": project.label,
            "description": project.description,
            "positive_votes": project.positive_votes_count,
            "negative_votes": project.negative_votes_count,
            "user_vote": project.user_vote_status(user.uuid),
        }
        for project in filtered
    ]

    return jsonify(data)


@api.route("/projects/newest", methods=["GET"])
@login_required(User)
def projects_newest(user):
    index = request.args.get("index", default=0, type=int)
    limit = request.args.get("limit", default=10, type=int)

    limit = min(limit, MAX_LIMIT)

    projects = db.session.query(Project).all()

    in_range = filter(
        lambda project: project.is_in_range((user.latitude, user.longitude)),
        projects,
    )

    filtered = sorted(in_range, key=lambda project: project.start_time, reverse=True)[
        index : index + limit
    ]

    data = [
        {
            "uuid": bytes_to_uuid_hex(project.uuid),
            "label": project.label,
            "description": project.description,
            "positive_votes": project.positive_votes_count,
            "negative_votes": project.negative_votes_count,
            "user_vote": project.user_vote_status(user.uuid),
        }
        for project in filtered
    ]

    return jsonify(data)
