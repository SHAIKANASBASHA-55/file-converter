import os, uuid

BASE = "/tmp"

def new_file(ext=""):
    uid = str(uuid.uuid4())
    return os.path.join(BASE, uid + ext)
