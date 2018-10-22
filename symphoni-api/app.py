from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from resources.party import Party
from resources.song import Song
from resources.playlist import Playlist
import persistence

persistence.init()

app = Flask(__name__)
api = Api(app)
CORS(app, resources={r'/*': {'origins': '*'}})

api.add_resource(Party,'/party/<string:name>')
api.add_resource(Song,'/party/<string:code>/song/')
api.add_resource(Playlist,'/party/<string:code>/playlist/')


if __name__ == '__main__':
    app.run(debug=True)
