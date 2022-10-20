from flask import Flask, render_template
from models import db, User
import blueprints.projects
import blueprints.events
import blueprints.user
import blueprints.signup
import blueprints.login
import blueprints.api
from utils.auth import check_login

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.sqlite3"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


app.register_blueprint(blueprints.projects.projects, url_prefix="/projects")
app.register_blueprint(blueprints.events.events, url_prefix="/events")
app.register_blueprint(blueprints.user.user, url_prefix="/user")
app.register_blueprint(blueprints.signup.signup, url_prefix="/signup")
app.register_blueprint(blueprints.login.login, url_prefix="/login")
app.register_blueprint(blueprints.api.api, url_prefix="/api")


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.context_processor
def render_context():
    return {"loggedIn": check_login(User)}


with app.app_context():
    db.init_app(app)
    db.create_all()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
