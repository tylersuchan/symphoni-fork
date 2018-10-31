from flask_restful import reqparse, Resource, abort
import persistence 
import json


class Token(Resource):
    def put(self,code):
        if not code in persistence.db:
            return abort(404,message="Code {} doesn't exist".format(code))

        parser = reqparse.RequestParser()
        parser.add_argument('access_token',type=str, location='json', required=True)
        parser.add_argument('expires_in',type=int, location='json', required=True)
        parser.add_argument('refresh_token',type=str, location='json', required=True)
        try:
           args = parser.parse_args(strict=True)
        except:
            return abort(400,message = "Invalid Input")

        persistence.db[code]['spotify_token_details'] = args

        return {'code': code, 'party_data': persistence.db[code]},201


