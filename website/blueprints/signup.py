from flask import Blueprint, render_template, redirect, request, url_for
from models import db, User


signup = Blueprint("signup", __name__)


@signup.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        db.session.add(User(username, password))
        db.session.commit()

        return redirect("#")
    else:
        return render_template("signup.html")
