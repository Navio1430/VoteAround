from uuid import uuid4
from uuid import UUID

UUID_LENGTH = len(uuid4().bytes)


def generate_uuid() -> bytes:
    return uuid4().bytes


def bytes_to_uuid_hex(b: bytes):
    return UUID(bytes=b).hex


def serialize_uuids(uuids: set) -> bytes:
    result = b""
    for uuid in uuids:
        result += uuid
    return result


def deserialize_uuids(serialized: bytes) -> set:
    result = set()
    for i in range(len(serialized) // UUID_LENGTH):
        result.add(serialized[i * UUID_LENGTH : (i + 1) * UUID_LENGTH])
    return result
