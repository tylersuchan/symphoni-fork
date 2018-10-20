from flask_restful import reqparse, Resource
import spotipy
from spotipy import oauth2
import random
import string
import persistence
import json

class Song(Resource):
    def get(self, code):
        if not code in persistence.db:
            return 404
        
        parser = reqparse.RequestParser()
        parser.add_argument('track',type=str)
        parser.add_argument('artist',type=str)
        parser.add_argument('album',type=str)
        try:
            args = parser.parse_args(strict=True)
        except:
            return {"message": "Invalid Input"},400


        spotify = spotipy.Spotify(auth=persistence.db[code]['oauth_token']['access_token'])

        return spotify.search(q='track:'+args['track'],type='track')
                
        return retval,200 

    def put(self, name):

        parser = reqparse.RequestParser()
        parser.add_argument('access_token',type=str, location='json', required=True)
        parser.add_argument('token_type',type=str, location='json', required=True)
        parser.add_argument('expires_in',type=int, location='json', required=True)
        parser.add_argument('refresh_token',type=str, location='json', required=True)
        parser.add_argument('scope',type=str, location='json', required=True)
        parser.add_argument('expires_at',type=int, location='json', required=True)
        try:
            args = parser.parse_args(strict=True)
        except:
            return {"message": "Invalid Input"},400

        code = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=6))

        persistence.db[code] = { 'name': name, 'playlist' : [], 'oauth_token': args}
        retval = {'code': code, 'party_data': persistence.db[code]}
        return retval, 201
