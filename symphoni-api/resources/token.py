from flask_restful import reqparse, Resource, abort
from configparser import ConfigParser
import requests
import persistence
import base64

config = ConfigParser()
config.read('config.ini')
spotify_settings = config['spotify_settings']


class Token(Resource):
    def put(self, code):
        if not code in persistence.db:
            abort(404, message="Code {} doesn't exist".format(code))

        parser = reqparse.RequestParser()
        parser.add_argument('access_token', type=str,
                            location='json', required=True)
        parser.add_argument('expires_in', type=int,
                            location='json', required=True)
        parser.add_argument('refresh_token', type=str,
                            location='json', required=True)
        try:
            args = parser.parse_args(strict=True)
        except:
            abort(400, message="Invalid Input")

        persistence.db[code]['spotify_token_details'] = args

        return {'code': code, 'party_data': persistence.db[code]}, 201

    def get(self, code):
        if code not in persistence.db:
            message = "No party found for code {}".format(code)
            abort(404, message=message)

        encoded_ids = "{}:{}".format(
            spotify_settings['spotifyClientId'], spotify_settings['spotifyClientSecret'])

        authorization = "Basic {}".format(
            base64.standard_b64encode(encoded_ids.encode()).decode('utf-8'))

        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authorization
        }

        body = {
            'grant_type': 'refresh_token',
            'refresh_token': persistence.db[code]['spotify_token_details']['refresh_token']
        }

        response = requests.post(
            'https://accounts.spotify.com/api/token', data=body, headers=headers)

        if (response.status_code == 200):
            access_token = response.json()['access_token']
            persistence.db[code]['spotify_token_details']['access_token'] = access_token
            retVal = {
                'message': 'Retreived new access token successfully',
                'access_token': access_token
            }
            return retVal, 200
        else:
            abort(
                404, message="Could not retreive new access token. Maybe the refresh token is out of date?")
