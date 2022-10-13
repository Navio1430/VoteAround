from random import randbytes
from hashlib import sha256

def hash_password(password: str, salt: bytes) -> bytes:
    data = password.encode("utf8") + salt
    return sha256(data).digest()

def generate_salt() -> bytes:
    return randbytes(16)