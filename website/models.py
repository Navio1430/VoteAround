from flask_sqlalchemy import SQLAlchemy
from utils.crypto import generate_salt, hash_password
from utils.uuid import generate_uuid

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"
    uuid = db.Column("uuid", db.LargeBinary, primary_key=True)
    username = db.Column("username", db.Text)
    hash = db.Column("hash", db.LargeBinary)
    salt = db.Column("salt", db.LargeBinary)
    latitude = db.Column("latitude", db.Float)
    longitude = db.Column("longitude", db.Float)
    positive_votes = db.Column("positive_votes", db.LargeBinary)  # uuid[]
    negative_votes = db.Column("negative_votes", db.LargeBinary)  # uuid[]

    def __init__(self, username, password, latitude, longitude):
        self.uuid = generate_uuid()
        self.username = username
        salt = generate_salt()
        hashed = hash_password(password, salt)
        self.hash = hashed
        self.salt = salt
        self.latitude = latitude
        self.longitude = longitude
        self.positive_votes = b""
        self.negative_votes = b""

    def check_password(self, password):
        return hash_password(password, self.salt) == self.hash


class Project(db.Model):
    __tablename__ = "projects"
    uuid = db.Column("uuid", db.LargeBinary, primary_key=True)
    label = db.Column("label", db.Text)
    description = db.Column("description", db.Text)
    latitude = db.Column("latitude", db.Float)
    longitude = db.Column("longitude", db.Float)
    radius = db.Column("radius", db.Float)
    positive_votes = db.Column("positive_votes", db.LargeBinary)  # uuid[]
    negative_votes = db.Column("negative_votes", db.LargeBinary)  # uuid[]

    def __init__(self, label, description, latitude, longitude, radius):
        self.uuid = uuid4().bytes
        self.label = label
        self.description = description
        self.latitude = latitude
        self.longitude = longitude
        self.radius = radius
        self.positive_votes = b""
        self.negative_votes = b""
