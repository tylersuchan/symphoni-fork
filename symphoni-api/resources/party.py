from flask_restful import reqparse, Resource
import random
import string
import persistence


class Party(Resource):
    def get(self, name):
        code = name
        if not code in persistence.db:
            return 404
        retval = {'code': code, 'party_data': persistence.db[code]} 
        return retval,200 

    def put(self, name):
        code = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=6))
        retval = {'code': code, 'name': name}
        persistence.db[code] = { 'name': name, 'playlist' : [] }
        retval = {'code': code, 'party_data': persistence.db[code]}
        return retval, 201

    def post(self,name):
        code = name
        if not code in persistence.db:
            return 404
        
        parser = reqparse.RequestParser()
        parser.add_argument('name')
        try:
            args = parser.parse_args(strict=True)
            if args['name'] is None or args['name'] is "":
                raise Exception('Input is None') 
        except:
            return {"message": "Invalid Input"},400


        persistence.db[code]['name'] = args['name']
        retval = {'code': code, 'party_data': persistence.db[code]}

        return retval,201

    def delete(self,name): 
        code = name
        if not code in persistence.db:
            return 404
        
        try:
            del persistence.db[code]
        except:
            return 500
        
        return {"message": "Delete Successful"},200



