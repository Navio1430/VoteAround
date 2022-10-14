from random import randbytes
from datetime import datetime, timedelta
import struct


TOKEN_SIZE = 32
TOKEN_STRUCT = struct.Struct(f"{TOKEN_SIZE}sQ")
TOKEN_EXPIRATION_TIME = timedelta(days=30)


def get_utc_time(delta: timedelta = timedelta(0)) -> int:
    return int(datetime.timestamp(datetime.utcnow() + delta))


def generate_token() -> bytes:
    return serialize_token(randbytes(TOKEN_SIZE), get_utc_time(TOKEN_EXPIRATION_TIME))


def serialize_token(token: bytes, time: int) -> bytes:
    return TOKEN_STRUCT.pack(token, time)


def deserialize_tokens(serialized: bytes) -> list[tuple[bytes, int]]:
    tokens = []
    for token, time in TOKEN_STRUCT.iter_unpack(serialized):
        tokens.append((token, time))
    return tokens
