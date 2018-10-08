from flask_restful import reqparse, Resource
import random
import string
import persistence


class Party(Resource):
    def get(self, id=None):
        return persistence.db

    def put(self, name):
        code = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=6))
        retval = {'code': code, 'name': name}
        persistence.db[code] = name
        return retval, 201
