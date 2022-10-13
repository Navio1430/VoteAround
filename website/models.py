from flask_sqlalchemy import SQLAlchemy
from utils.crypto import generate_salt, hash_password


db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"
    _id = db.Column("id", db.Integer, primary_key=True)
    username = db.Column("username", db.Text)
    hash = db.Column("hash", db.LargeBinary(32))
    salt = db.Column("salt", db.LargeBinary(16))

    def __init__(self, username, password):
        self.username = username
        salt = generate_salt()
        hashed = hash_password(password, salt)
        self.hash = hashed
        self.salt = salt
