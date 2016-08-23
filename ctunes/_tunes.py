import os
from cantools.web import respond, succeed

def response():
    dirs = {}
    def scan(nothing, dirname, fnames):
        dirs[os.path.split(dirname)[-1]] = fnames[:5]
    os.path.walk("mp3", scan, None)
    succeed(dirs)

respond(response)