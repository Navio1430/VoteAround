from random import randbytes
from datetime import timedelta
import struct
from .time import get_utc_time
from flask import redirect, request, url_for
from functools import wraps
from base64 import b64decode
import binascii


TOKEN_SIZE = 32
TOKEN_STRUCT = struct.Struct(f"{TOKEN_SIZE}sQ")
TOKEN_EXPIRATION_TIME = timedelta(days=30)


def login_required(db_model):
    def login_required(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            user = check_login(db_model)
            if not user:
                return redirect(url_for("login.index"))

            return f(*[user] + list(args), **kwargs)

        return wrapper

    return login_required


def check_login(db_model):
    uuid = request.cookies.get("uuid")
    try:
        if uuid:
            uuid = b64decode(uuid.encode())
        else:
            raise KeyError("uuid cookie not present")
    except (binascii.Error, KeyError):
        return

    token = request.cookies.get("token")
    try:
        if token:
            token = b64decode(token.encode())
        else:
            raise KeyError("token cookie not present")
    except (binascii.Error, KeyError):
        return

    user = db_model.query.filter_by(uuid=uuid).first()

    if not user:
        return

    if not user.check_token(token):
        return

    return user


def generate_token() -> bytes:
    return serialize_token(randbytes(TOKEN_SIZE), get_utc_time(TOKEN_EXPIRATION_TIME))


def serialize_token(token: bytes, time: int) -> bytes:
    return TOKEN_STRUCT.pack(token, time)


def deserialize_tokens(serialized: bytes):
    for token, time in TOKEN_STRUCT.iter_unpack(serialized):
        yield (token, time)
