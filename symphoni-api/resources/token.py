from flask_restful import reqparse, Resource
import persistence 
import json


class Token(Resource):
    def put(self,code):
        if not code in persistence.db:
            return 404

        parser = reqparse.RequestParser()
        parser.add_argument('access_token',type=str, location='json', required=True)
        parser.add_argument('expires_in',type=int, location='json', required=True)
        parser.add_argument('refresh_token',type=str, location='json', required=True)
        try:
           args = parser.parse_args(strict=True)
        except:
            return {"message": "Invalid Input"},400

        persistence.db[code]['spotify_token_details'] = args

        return {'code': code, 'party_data': persistence.db[code]},201


