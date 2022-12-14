from flask_sqlalchemy import SQLAlchemy
from utils.crypto import generate_salt, hash_password
from utils.uuid import UUID_LENGTH, generate_uuid, serialize_uuids, deserialize_uuids
from utils.auth import deserialize_tokens
from utils.time import get_utc_time
from geopy.distance import geodesic


db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"
    uuid = db.Column("uuid", db.LargeBinary, primary_key=True)
    authored = db.Column("authored", db.LargeBinary)  # uuid[]
    username = db.Column("username", db.Text)
    tokens = db.Column("tokens", db.LargeBinary)
    hash = db.Column("hash", db.LargeBinary)
    salt = db.Column("salt", db.LargeBinary)
    latitude = db.Column("latitude", db.Float)
    longitude = db.Column("longitude", db.Float)
    votes = db.Column("votes", db.LargeBinary)  # uuid[] - vote status saved in project

    def __init__(self, username, password, latitude, longitude):
        self.uuid = generate_uuid()
        self.authored = b""
        self.username = username
        self.tokens = b""
        self.set_password(password)
        self.latitude = latitude
        self.longitude = longitude
        self.votes = b""

    @property
    def pos(self):
        return (self.latitude, self.longitude)
    
    def vote_project(self, project, vote_value):
        neg_votes = set(deserialize_uuids(project.negative_votes))
        pos_votes = set(deserialize_uuids(project.positive_votes))
        neg_votes.discard(self.uuid)
        pos_votes.discard(self.uuid)

        user_votes = set(deserialize_uuids(self.votes))
        user_votes.discard(project.uuid)

        if vote_value == -1:
            neg_votes.add(self.uuid)
        elif vote_value == 1:
            pos_votes.add(self.uuid)
        
        project.negative_votes = serialize_uuids(neg_votes)
        project.positive_votes = serialize_uuids(pos_votes)

        if vote_value != 0:
            user_votes.add(project.uuid)

        self.votes = serialize_uuids(user_votes)

        db.session.commit()
        

    def get_vote_status(self, project):
        if self.uuid in deserialize_uuids(project.positive_votes):
            return 1
        elif self.uuid in deserialize_uuids(project.negative_votes):
            return -1
        else:
            return 0

    def set_password(self, password:str):
        salt = generate_salt()
        hashed = hash_password(password, salt)
        self.hash = hashed
        self.salt = salt

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
    author = db.Column("author", db.LargeBinary)
    label = db.Column("label", db.Text)
    description = db.Column("description", db.Text)
    latitude = db.Column("latitude", db.Float, nullable=False)
    longitude = db.Column("longitude", db.Float, nullable=False)
    radius = db.Column("radius", db.Float, nullable=False)
    positive_votes = db.Column("positive_votes", db.LargeBinary)  # uuid[]
    negative_votes = db.Column("negative_votes", db.LargeBinary)  # uuid[]
    start_time = db.Column("start_time", db.BigInteger)
    end_time = db.Column("end_time", db.BigInteger)

    def __init__(self, label, author, description, latitude, longitude, radius, start_time, end_time):
        self.uuid = generate_uuid()
        self.author = author.uuid
        self.label = label
        self.description = description
        self.latitude = latitude
        self.longitude = longitude
        self.radius = radius
        self.start_time = start_time
        self.end_time = end_time
        self.positive_votes = b""
        self.negative_votes = b""

    @property
    def pos(self):
        return (self.latitude, self.longitude)

    @property
    def positive_votes_count(self):
        return len(self.positive_votes) // UUID_LENGTH

    @property
    def negative_votes_count(self):
        return len(self.negative_votes) // UUID_LENGTH

    def is_in_range(self, pos):
        return geodesic(pos, self.pos).m <= self.radius