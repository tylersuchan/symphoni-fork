from flask_restful import reqparse, Resource, abort
import random
import string
import persistence
import json


class Party(Resource):
    def get(self, name):
        code = name
        if not code in persistence.db:
            abort(404, message="Code {} doesn't exist".format(code))
        retval = {'code': code, 'party_data': persistence.db[code]}
        return retval, 200

    def put(self, name):

        code = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=6))

        persistence.db[code] = {'name': name,
                'playlist': [], 'spotify_token_details': {}, 'users': []}
        retval = {'code': code, 'party_data': persistence.db[code]}
        return retval, 201

    def post(self, name):
        code = name
        if not code in persistence.db:
            abort(404, message="Code {} doesn't exist".format(code))

        parser = reqparse.RequestParser()
        parser.add_argument('name')
        try:
            args = parser.parse_args(strict=True)
            if args['name'] is None or args['name'] is "":
                raise Exception('Input is None')
        except:
            abort(400, message="Invalid arguments")

        persistence.db[code]['name'] = args['name']
        retval = {'code': code, 'party_data': persistence.db[code]}

        return retval, 201

    def delete(self, name):
        code = name
        if not code in persistence.db:
            abort(404, message="Code {} doesn't exist".format(code))
        try:
            del persistence.db[code]
        except:
            abort(500, message="Something went horribly wrong")

        return {"message": "Delete Successful"}, 200

        return {"message": "Delete Successful"}, 200
