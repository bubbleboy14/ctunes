import os
from cantools.web import respond, succeed

def response():
    dirs = {}
    def scan(dirname, fnames):
        fz = [f for f in fnames if f != "mp3.zip"]
        fz.sort()
        dirs[os.path.split(dirname)[-1]] = fz
    for dirname, dirz, filez in os.walk("mp3"):
        scan(dirname, dirz + filez)
    succeed(dirs)

respond(response)