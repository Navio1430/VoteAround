from flask import Flask, render_template, request, url_for, redirect
from models import db
import blueprints.projects
import blueprints.signup
import blueprints.signin


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.sqlite3"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


app.register_blueprint(blueprints.projects.projects, url_prefix="/projects")
app.register_blueprint(blueprints.signup.signup, url_prefix="/signup")
app.register_blueprint(blueprints.signin.signin, url_prefix="/signin")


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


with app.app_context():
    db.init_app(app)
    db.create_all()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
