from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from resources.party import Party
from resources.song import Song
from resources.playlist import Playlist
from resources.token import Token
from spotify_auth import spotify_auth
import persistence

persistence.init()

app = Flask(__name__)

app.register_blueprint(spotify_auth)

api = Api(app)
CORS(app, resources={r'/*': {'origins': '*'}})

api.add_resource(Party, '/party/<string:name>')
api.add_resource(Song, '/party/<string:code>/song')
api.add_resource(Playlist, '/party/<string:code>/playlist')
api.add_resource(Token, '/token/<string:code>')

if __name__ == '__main__':
    app.run(debug=True)
