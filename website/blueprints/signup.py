from flask import Blueprint, render_template, redirect, url_for, request
from models import db, User


signup = Blueprint("signup", __name__)


@signup.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        latitude = request.form.get("latitude", -200, float)
        longitude = request.form.get("longitude", -200, float)

        user = User.query.filter_by(username=username).first()
        if user:
            return render_template("bug/bug.html")

        if len(username) < 4:
            return render_template("bug/bug.html")

        if len(password) < 8:
            return render_template("bug/bug.html")

        if -90 > latitude or latitude > 90:
            return "<h2>Latitude is invalid</h2>"

        if -180 > longitude or longitude > 180:
            return "<h2>Longitude is invalid</h2>"

        db.session.add(User(username, password, latitude, longitude))
        db.session.commit()

        return redirect(url_for("projects.index"))

    else:
        return render_template("signup/signup.html")
