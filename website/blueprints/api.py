from flask import Blueprint, render_template, request
from utils.auth import login_required
from models import User, Project, db
from utils.uuid import bytes_to_uuid_hex, hex_to_uuid_bytes
# from geopy.distance import geodesic
import json

api = Blueprint("api", __name__)


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
@api.route("/projects/project", methods=["GET", "POST"])
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
        "user_vote": project.user_vote_status(user.uuid)
    }

    return json.dumps(data)

#
#    Request closest projects
#
#    response:
#    {
#         uuid: {
#             label
#         }
#         ...
#    }
#
#           /projects/newest?index=(int)&limit=(int)
@api.route("/projects/closest", methods=["GET", "POST"])
@login_required(User)
def projects_closest(user):

    latitude = user.latitude
    longitude = user.longitude

    index = request.args.get("index", default=0, type=int)
    limit = request.args.get("limit", default=10, type=int)

    if limit > 50:
        limit = 50

    data = {}

    while True:
        result = (
            db.session.query(Project.uuid, Project.label, Project.latitude, Project.longitude, Project.radius)
            .limit(25)
            .offset(index)
        )

        for row in result:
            if geodesic((latitude, longitude), (row.latitude, row.longitude)).m <= row.radius:
                data[bytes_to_uuid_hex(row.uuid)] = {
                    "label": row.label
                }
            
            if len(data) >= limit:
                break

        if result.count() < 25:
            break

        index += 25

    return json.dumps(data)

