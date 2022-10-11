from flask import Blueprint, render_template

projects = Blueprint("projects", __name__)


@projects.route("/", methods=["GET"])
def index():
    return render_template("projects.html")
