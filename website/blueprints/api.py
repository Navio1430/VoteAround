from flask import Blueprint, jsonify, request
from utils.auth import login_required
from models import User, Project, db
from utils.uuid import bytes_to_uuid_hex, hex_to_uuid_bytes
from geopy.distance import geodesic

api = Blueprint("api", __name__)

MAX_LIMIT = 50


@api.route("user/delete", methods=["POST"])
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
        "positive_votes": int(project.positive_votes_count()),
        "negative_votes": int(project.negative_votes_count()),
        "user_vote": project.user_vote_status(user.uuid),
    }

    return jsonify(data)


@api.route("/projects/popular", methods=["GET"])
@login_required(User)
def projects_popular(user):
    index = request.args.get("index", default=0, type=int)
    limit = request.args.get("limit", default=10, type=int)

    limit = min(limit, MAX_LIMIT)

    data = {}

    projects = db.session.query(Project).all()

    filtered = sorted(projects, key=lambda project: project.positive_votes_count())[index:index+limit]

    for project in filtered:
        data[bytes_to_uuid_hex(project.uuid)] = {
            "label": project.label,
            "description": project.description,
            "positive_votes": project.positive_votes_count(),
            "negative_votes": project.negative_votes_count(),
            "user_vote": project.user_vote_status(user.uuid),
        }

    return jsonify(data)

#
#    Request closest projects
#
#    response:
#    {
#         uuid: {
#             label
#             description
#             positive_votes (int, positive votes count)
#             negative_votes (int, negative votes count)
#             user_vote (int, -1 -> negative, 0 -> nothing, 1 -> positive)
#         }
#         ...
#    }
#
#           /projects/closest?index=(int)&limit=(int)
@api.route("/projects/closest", methods=["GET"])
@login_required(User)
def projects_closest(user):

    latitude = user.latitude
    longitude = user.longitude

    index = request.args.get("index", default=0, type=int)
    limit = request.args.get("limit", default=10, type=int)

    limit = min(limit, MAX_LIMIT)

    data = {}

    while True:
        result = db.session.query(Project).limit(25).offset(index)

        for project in result:
            if (
                geodesic((latitude, longitude), (project.latitude, project.longitude)).m
                <= project.radius
            ):
                data[bytes_to_uuid_hex(project.uuid)] = {
                    "label": project.label,
                    "description": project.description,
                    "positive_votes": project.positive_votes_count(),
                    "negative_votes": project.negative_votes_count(),
                    "user_vote": project.user_vote_status(user.uuid),
                }

            if len(data) >= limit:
                break

        if result.count() < 25:
            break

        index += 25

    return jsonify(data)
