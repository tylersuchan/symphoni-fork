from flask_restful import reqparse, Resource, abort
import random
import string
import persistence
import json


class Voting(Resource):

    def put(self, code):

        if not code in persistence.db:
            abort(404, message="Code {} doesn't exist".format(code))

        parser = reqparse.RequestParser()
        parser.add_argument('track_uri', type=str,
                            location='args', required=True)
        parser.add_argument('vote', type=str, location='args', required=True)
        parser.add_argument('user', type=str, location='args', required=True)

        try:
            args = parser.parse_args(strict=True)
            if not(("up" in args["vote"]) or ("down" in args["vote"])):
                raise Exception("Please specify vote (up or down)")
            if args['track_uri'] is None or args['track_uri'] is "":
                raise Exception('Please specify a valid track_uri')
            if args['user'] is None or args['user'] is "":
                raise Exception('Please enter a valid user in the party')
        except:
            abort(400, message="Invalid arguments")

        songFound = False
        userFound = False

        if args['user'] in persistence.db[code]["users"]:  # Checks if user is in party
            userFound = True
        else:
            abort(400, message="The requested user is not in the party")

        for item in persistence.db[code]["playlist"]:
            if item["song"]["track_uri"] == args["track_uri"]:
                if userFound:
                    if args['user'] in item['user_votes']:
                        abort(400, message="A user can only vote on song once")
                    else:
                        item["vote"] = item["vote"] + \
                            1 if "up" in args["vote"] else item["vote"]-1
                        #item["user_votes"].append({args['user']:"up"} if "up" in args["vote"] else {args['user']:"down"})
                        item["user_votes"].append(args['user'])
                        songFound = True
                        break
                else:
                    abort(404, message="Only users in the party can vote on songs")

        if not songFound:
            abort(404, message="Song not found in the playlist")
        newlist = sorted(
            persistence.db[code]["playlist"], key=lambda k: k["vote"], reverse=True)
        persistence.db[code]["playlist"] = newlist
        retval = {'code': code, 'party_data': persistence.db[code]}
        return retval, 201
