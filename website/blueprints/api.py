from flask import Blueprint, jsonify, request
from utils.auth import login_required
from models import User, Project, db
from utils.uuid import bytes_to_uuid_hex, hex_to_uuid_bytes, deserialize_uuids

api = Blueprint("api", __name__)

MAX_LIMIT = 50


@api.route("/user/delete", methods=["POST"])
@login_required(User)
def user_delete_account(user):
    data = request.get_json()
    password = data.get("password", "")

    if not user.check_password(password):
        return jsonify({"success": False})

    authored_ids = deserialize_uuids(user.authored)

    for project_uuid in authored_ids:
        Project.query.filter_by(uuid=project_uuid).delete()

    db.session.delete(user)
    db.session.commit()

    return jsonify({"success": True})


@api.route("/user/edit", methods=["POST"])
@login_required(User)
def user_edit_account(user):
    data = request.get_json()
    password = data.get("password", "")

    success = True

    if not user.check_password(password):
        return jsonify({"success": False})

    new_password = data.get("new_password")
    if new_password:
        if len(new_password) < 8:
            success = False
        else:
            user.set_password(new_password)

    new_username = data.get("new_username")
    if new_username:
        if len(new_username) < 4:
            success = False
        else:
            user.username = new_username

    new_latitude_str = data.get("new_latitude")
    if new_latitude_str:
        try:
            new_latitude = float(new_latitude_str)
            if -90 > new_latitude or new_latitude > 90:
                success = False
            else:
                user.latitude = new_latitude
        except ValueError:
            success = False

    new_longitude_str = data.get("new_longitude")
    if new_longitude_str:
        try:
            new_longitude = float(new_longitude_str)
            if -180 > new_longitude or new_longitude > 180:
                success = False
            else:
                user.longitude = new_longitude
        except ValueError:
            success = False

    db.session.commit()

    return jsonify({"success": success})


@api.route("/project/vote", methods=["POST"])
@login_required(User)
def project_vote(user):
    data = request.get_json()
    uuid_hex = data.get("uuid", "")
    vote_value = data.get("vote_value")

    try:
        uuid = hex_to_uuid_bytes(uuid_hex)
    except ValueError:
        return jsonify({"success": False})

    project = db.session.query(Project).filter(Project.uuid == uuid).first()

    if not project:
        return jsonify({"success": False})

    if vote_value not in (-1, 0, 1):
        return jsonify({"success": False})

    user.vote_project(project, vote_value)

    return jsonify({"success": True})


@api.route("/projects/project", methods=["GET"])
@login_required(User)
def projects_project(user):
    uuid_hex = request.args.get("uuid")

    try:
        uuid = hex_to_uuid_bytes(uuid_hex)
    except ValueError:
        return jsonify({})

    project = db.session.query(Project).filter(Project.uuid == uuid).first()

    if not project:
        return jsonify({})

    data = {
        "uuid": uuid_hex,
        "label": project.label,
        "description": project.description,
        "latitude": project.latitude,
        "longitude": project.longitude,
        "radius": project.radius,
        "positive_votes": int(project.positive_votes_count),
        "negative_votes": int(project.negative_votes_count),
        "user_vote": user.get_vote_status(project),
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
            "user_vote": user.get_vote_status(project),
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
            "user_vote": user.get_vote_status(project),
        }
        for project in filtered
    ]

    return jsonify(data)


@api.route("/projects/voted", methods=["GET"])
@login_required(User)
def projects_voted(user):
    index = request.args.get("index", default=0, type=int)
    limit = request.args.get("limit", default=10, type=int)

    limit = min(limit, MAX_LIMIT)

    voted_ids = list(deserialize_uuids(user.votes))[::-1]

    projects = [
        Project.query.filter_by(uuid=project_uuid).first() for project_uuid in voted_ids
    ]

    in_range = filter(
        lambda project: project.is_in_range((user.latitude, user.longitude)),
        projects,
    )

    filtered = list(in_range)[index : index + limit]

    data = [
        {
            "uuid": bytes_to_uuid_hex(project.uuid),
            "label": project.label,
            "description": project.description,
            "positive_votes": project.positive_votes_count,
            "negative_votes": project.negative_votes_count,
            "user_vote": user.get_vote_status(project),
        }
        for project in filtered
    ]

    return jsonify(data)


@api.route("/projects/authored", methods=["GET"])
@login_required(User)
def projects_authored(user):
    index = request.args.get("index", default=0, type=int)
    limit = request.args.get("limit", default=10, type=int)

    limit = min(limit, MAX_LIMIT)

    authored_ids = list(deserialize_uuids(user.authored))[::-1]

    projects = [
        Project.query.filter_by(uuid=project_uuid).first()
        for project_uuid in authored_ids
    ]

    in_range = filter(
        lambda project: project.is_in_range((user.latitude, user.longitude)),
        projects,
    )

    filtered = list(in_range)[index : index + limit]

    data = [
        {
            "uuid": bytes_to_uuid_hex(project.uuid),
            "label": project.label,
            "description": project.description,
            "positive_votes": project.positive_votes_count,
            "negative_votes": project.negative_votes_count,
            "user_vote": user.get_vote_status(project),
        }
        for project in filtered
    ]

    return jsonify(data)
