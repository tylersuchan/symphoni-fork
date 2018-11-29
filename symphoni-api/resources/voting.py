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
        parser.add_argument('vote',required=True)
        parser.add_argument('song', type=str, location='json', required=True)
        try:
            args = parser.parse_args(strict=True)
            if args['vote'] is None or args['vote'] is "" or args['song'] is None or args['vote'] is "":
                raise Exception('Input is None, please specify a voting choice and/or song choice')
        except:
            abort(400, message="Invalid arguments")
        #end of changes, need to implement rest ...
        args["song"]
        json_acceptable_string = args["song"].replace("'", "\"")
        try:
            song = json.loads(json_acceptable_string)
        except:
            return {"message": "Invalid JSON"}, 400

        if args['vote'] in persistence.db[code]['users']:
            abort(400, message="User already exists please specify new username")

        persistence.db[code]['users'].append(args['username'])

        return {"message": "User has been added"},200
