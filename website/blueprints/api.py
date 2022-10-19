from flask import Blueprint, render_template, request
from utils.auth import login_required
from models import User, Project, db
from utils.uuid import bytes_to_uuid_hex
from geopy.distance import geodesic
import json

api = Blueprint("api", __name__)


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

    return data

