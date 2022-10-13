from flask_sqlalchemy import SQLAlchemy
from utils.crypto import generate_salt, hash_password


db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"
    _id = db.Column("id", db.Integer, primary_key=True)
    username = db.Column("username", db.Text)
    hash = db.Column("hash", db.LargeBinary)
    salt = db.Column("salt", db.LargeBinary)

    def __init__(self, username, password):
        self.username = username
        salt = generate_salt()
        hashed = hash_password(password, salt)
        self.hash = hashed
        self.salt = salt

    def check_password(self, password):
        return hash_password(password, self.salt) == self.hash