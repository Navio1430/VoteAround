from flask import Blueprint, render_template, redirect, request, url_for
from models import db, User
from utils.crypto import hash_password


login = Blueprint("login", __name__)


@login.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        user = User.query.filter_by(username=username).first()

        if not user:
            return "<h1>Username not found</h1>"

        if user.check_password(password):
            return "<h1>Success</h1>"
        else:
            return "<h1>Failed</h1>"

        # return redirect("#")
    else:
        return render_template("login/login.html")
