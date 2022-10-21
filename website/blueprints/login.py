from flask import Blueprint, make_response, redirect, render_template, request, url_for
from models import db, User
from utils.auth import check_login, generate_token, TOKEN_SIZE, TOKEN_EXPIRATION_TIME
from utils.time import get_utc_time
from base64 import b64encode



login = Blueprint("login", __name__)


@login.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        user = User.query.filter_by(username=username).first()

        if not user:
            return render_template("bug/bug.html")

        if user.check_password(password):
            token = generate_token()    # serialized data, with expiration time
            user.tokens += token
            db.session.commit()
            resp = make_response(redirect("#"))
            resp.set_cookie("uuid", b64encode(user.uuid).decode(), expires=get_utc_time(TOKEN_EXPIRATION_TIME))
            resp.set_cookie("token", b64encode(token[:TOKEN_SIZE]).decode(), expires=get_utc_time(TOKEN_EXPIRATION_TIME))
            return resp
        else:
            return render_template("bug/bug.html")

    else:
        user = check_login(User)
        if user:
            return redirect(url_for("index"))
        return render_template("login/login.html")
