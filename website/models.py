from flask_sqlalchemy import SQLAlchemy
from utils.crypto import generate_salt, hash_password
from utils.uuid import UUID_LENGTH, generate_uuid, deserialize_uuids
from utils.auth import deserialize_tokens
from utils.time import get_utc_time


db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"
    uuid = db.Column("uuid", db.LargeBinary, primary_key=True)
    username = db.Column("username", db.Text)
    tokens = db.Column("tokens", db.LargeBinary)
    hash = db.Column("hash", db.LargeBinary)
    salt = db.Column("salt", db.LargeBinary)
    latitude = db.Column("latitude", db.Float)
    longitude = db.Column("longitude", db.Float)
    positive_votes = db.Column("positive_votes", db.LargeBinary)  # uuid[]
    negative_votes = db.Column("negative_votes", db.LargeBinary)  # uuid[]

    def __init__(self, username, password):
        self.uuid = generate_uuid()
        self.username = username
        self.tokens = b""
        salt = generate_salt()
        hashed = hash_password(password, salt)
        self.hash = hashed
        self.salt = salt
        # self.latitude = latitude
        self.latitude = 0
        # self.longitude = longitude
        self.longitude = 0
        self.positive_votes = None
        self.negative_votes = None

    def check_password(self, password: str) -> bool:
        return hash_password(password, self.salt) == self.hash

    def check_token(self, token: bytes) -> bool:
        for user_token, time in deserialize_tokens(self.tokens):
            if token == user_token and time > get_utc_time():
                return True
        return False


class Project(db.Model):
    __tablename__ = "projects"
    uuid = db.Column("uuid", db.LargeBinary, primary_key=True)
    label = db.Column("label", db.Text)
    description = db.Column("description", db.Text)
    latitude = db.Column("latitude", db.Float, nullable=False)
    longitude = db.Column("longitude", db.Float, nullable=False)
    radius = db.Column("radius", db.Float, nullable=False)
    positive_votes = db.Column("positive_votes", db.LargeBinary)  # uuid[]
    negative_votes = db.Column("negative_votes", db.LargeBinary)  # uuid[]
    end_time = db.Column("end_time", db.BigInteger)

    def __init__(self, label, description, latitude, longitude, radius, end_time):
        self.uuid = generate_uuid()
        self.label = label
        self.description = description
        self.latitude = latitude
        self.longitude = longitude
        self.radius = radius
        self.end_time = end_time
        self.positive_votes = None
        self.negative_votes = None

    def positive_votes_count(self):
        if self.positive_votes == None:
            return 0

        return len(self.positive_votes) // UUID_LENGTH

    def negative_votes_count(self):
        if self.negative_votes == None:
            return 0

        return len(self.negative_votes) // UUID_LENGTH

    def user_vote_status(self, uuid: bytes):
        if (self.positive_votes is not None) and (
            uuid in deserialize_uuids(self.positive_votes)
        ):
            return 1

        if (self.negative_votes is not None) and (
            uuid in deserialize_uuids(self.negative_votes)
        ):
            return -1

        return 0
