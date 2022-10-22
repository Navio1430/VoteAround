from flask import Blueprint, jsonify, request
from utils.auth import login_required
from models import User, Project, db
from utils.uuid import bytes_to_uuid_hex, hex_to_uuid_bytes
from geopy.distance import geodesic

api = Blueprint("api", __name__)

MAX_LIMIT = 50


@api.route("/user/delete", methods=["POST"])
@login_required(User)
def user_delete_account(user):
    data = request.get_json()

    if not user.check_password(data["password"]):
        return {"success": False}

    db.session.query(User).filter(User.uuid == user.uuid).delete()
    db.session.commit()

    return {"success": True}


#
#    Request project info by uuid
#
#    response:
#        uuid (str)
#        label
#        description
#        latitude
#        longitude
#        radius
#        positive_votes (int, positive votes count)
#        negative_votes (int, negative votes count)
#        user_vote (int, -1 -> negative, 0 -> nothing, 1 -> positive)
#
#           /projects/project?id=(uuid)
@api.route("/projects/project", methods=["GET"])
@login_required(User)
def projects_project(user):
    uuid = request.args.get("id")

    try:
        b_uuid = hex_to_uuid_bytes(uuid)
    except ValueError:
        return "{}"

    project = db.session.query(Project).filter(Project.uuid == b_uuid).first()

    if not project:
        return "{}"

    data = {
        "uuid": uuid,
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
        lambda project: project.is_in_range((user.latitude, user.longitude)),
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


@api.route("/projects/closest", methods=["GET"])
@login_required(User)
def projects_closest(user):

    latitude = user.latitude
    longitude = user.longitude

    index = request.args.get("index", default=0, type=int)
    limit = request.args.get("limit", default=10, type=int)

    limit = min(limit, MAX_LIMIT)

    projects = db.session.query(Project).all()

    in_range = filter(
        lambda project: project.is_in_range((user.latitude, user.longitude)),
        projects,
    )
    filtered = sorted(
        in_range,
        key=lambda project: geodesic(
            (latitude, longitude), (project.latitude, project.longitude).m
        ),
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
