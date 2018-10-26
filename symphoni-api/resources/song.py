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
        parser.add_argument("track", type=str)
        parser.add_argument("artist", type=str)
        parser.add_argument("album", type=str)
        try:
            args = parser.parse_args(strict=True)
        except:
            return {"message": "Invalid Input"}, 400

        spotify = spotipy.Spotify(
            auth=persistence.db[code]["oauth_token"]["access_token"]
        )

        jsonResult = spotify.search(q="track:" + args["track"], type="track")
        retval = {"results": []}

        for items in jsonResult["tracks"]["items"]:

            artists = []

            for artist in items["artists"]:

                artist_json = {
                    "artist_name": artist["name"],
                    "artist_uri": artist["uri"]
                }

                artists.append(artist_json)

            album_json = {
                "album_name": items["album"]["name"],
                "album_images": items["album"]["images"],
                "album_release_date": items["album"]["release_date"],
                "album_uri": items["album"]["uri"]
            }

            song_json = {
                "track": items["name"],
                "track_uri": items["uri"],
                "album_information": album_json,
                "artist_information": artists
            }

            retval["results"].append(song_json)

        return retval, 200

    def put(self,code):
        if not code in persistence.db:
            return 404

        parser = reqparse.RequestParser()
        parser = reqparse.RequestParser()
        parser.add_argument('access_token',type=str, location='json', required=True)
        parser.add_argument('expires_in',type=int, location='json', required=True)
        parser.add_argument('refresh_token',type=str, location='json', required=True)
        try:
           args = parser.parse_args(strict=True)
        except:
            return {"message": "Invalid Input"},400

        persistence.db[code]['oauth_token'] = args

        return {'code': code, 'party_data': persistence.db[code]},201







