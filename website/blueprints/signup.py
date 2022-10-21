from flask import Blueprint, render_template, request
from models import db, User


signup = Blueprint("signup", __name__)


@signup.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        user = User.query.filter_by(username=username).first()
        if user:
            return render_template("bug/bug.html")

        if len(username) < 4:
            return render_template("bug/bug.html")

        if len(password) < 8:
            return render_template("bug/bug.html")

        db.session.add(User(username, password))
        db.session.commit()

        return render_template("projects/projects.html")

    else:
        return render_template("signup/signup.html")
