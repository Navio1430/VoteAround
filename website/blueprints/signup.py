from flask import Blueprint, render_template, redirect, request, url_for
from models import db, User


signup = Blueprint("signup", __name__)


@signup.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        user = User.query.filter_by(username=username).first()
        if user:
            return "<h1>An user with this username already exists</h1>"

        if len(username) < 4:
            return "<h1>Username must contain at least 4 characters</h1>"

        if len(password) < 8:
            return "<h1>Password must contain at least 8 characters</h1>"

        db.session.add(User(username, password))
        db.session.commit()

        return "<h1>Success</h1>"

        # return redirect("#")
    else:
        return render_template("sign/signup.html")
