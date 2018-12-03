from flask_restful import reqparse, Resource, abort
import string
import persistence
import spotipy
import json


class Playlist(Resource):
    def get(self, code):
        if not code in persistence.db:
            abort(404, message="Code {} doesn't exist".format(code))

        retval = {'playlist': persistence.db[code]['playlist']}
        return retval, 200

    def put(self, code):
        if not code in persistence.db:
            abort(404, message="Code {} doesn't exist".format(code))

        parser = reqparse.RequestParser()
        parser.add_argument('song', type=str, location='json', required=True)
        try:
            args = parser.parse_args(strict=True)
        except:
            abort(400, message="Invalid Input")

        args["song"]
        json_acceptable_string = args["song"].replace("'", "\"")
        try:
            song = json.loads(json_acceptable_string)
        except:
            return {"message": "Invalid JSON"}, 400

        playlist_item = {
            "song": song,
            "vote": 0,
            #new field - keeps track of what user voted for this song so one user can't vote multiple times
            #Will be a list of dictionaries. Key is user, value is "up" or "down" -T.S. 11/29/2018
            "user_votes": []
        }

        persistence.db[code]["playlist"].append(playlist_item)
        newlist = sorted(persistence.db[code]["playlist"],
                         key=lambda k: k["vote"], reverse=True)
        persistence.db[code]["playlist"] = newlist
        retval = {'code': code, 'party_data': persistence.db[code]}
        return retval, 201

    def delete(self, code):
        if not code in persistence.db:
            abort(404, message="Code {} doesn't exist".format(code))

        parser = reqparse.RequestParser()
        parser.add_argument('track_uri', type=str, required=True)
        try:
            args = parser.parse_args(strict=True)
        except:
            return {"message": "Invalid Input"}, 400

        persistence.db[code]["playlist"][:] = [song for song in persistence.db[code]
                                               ["playlist"] if song.get("song").get("track_uri") != args["track_uri"]]

        return {'code': code, 'party_data': persistence.db[code]}, 200
