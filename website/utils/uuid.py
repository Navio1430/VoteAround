from uuid import uuid4


UUID_LENGTH = len(uuid4().bytes)


def generate_uuid() -> bytes:
    return uuid4().bytes


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
