from flask import Blueprint, render_template, request
from models import  User
from utils.auth import login_required

user = Blueprint("user", __name__)

@user.route("/", methods=["GET"])
@login_required(User)
def index(user):
    return render_template("user/user.html")
