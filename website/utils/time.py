from datetime import datetime, timedelta


def get_utc_time(delta: timedelta = timedelta(0)) -> int:
    return int(datetime.timestamp(datetime.utcnow() + delta))
