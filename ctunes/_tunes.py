import os
from cantools.web import respond, succeed

def response():
    dirs = {}
    def scan(nothing, dirname, fnames):
        fz = [f for f in fnames if f != "mp3.zip"]
        fz.sort()
        dirs[os.path.split(dirname)[-1]] = fz
    os.path.walk("mp3", scan, None)
    succeed(dirs)

respond(response)