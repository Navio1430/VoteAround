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
            return render_template("bug/bug.html", error_message="Nazwa Użytkownika jest zajęta")

        if len(username) < 4:
            return render_template("bug/bug.html", error_message="Nazwa Użytkownika musi zawierać przynajmniej 4 znaki")

        if len(password) < 8:
            return render_template("bug/bug.html", error_message="Hasło musi zawierać przynajmniej 8 znaków")

        if -90 > latitude or latitude > 90:
            return render_template("bug/bug.html", error_message="Szerokość geograficzna ma niepoprawną wartość")

        if -180 > longitude or longitude > 180:
            return render_template("bug/bug.html", error_message="Długość geograficzna ma niepoprawną wartość")

        db.session.add(User(username, password, latitude, longitude))
        db.session.commit()

        return redirect(url_for("projects.index"))

    else:
        return render_template("signup/signup.html")
