from flask_restful import reqparse, Resource, abort
import random
import string
import persistence
import json


class User(Resource):
    def get(self, code):
        if not code in persistence.db:
            abort(404, message="Code {} doesn't exist".format(code))

        parser = reqparse.RequestParser()
        parser.add_argument('username')
        try:
            args = parser.parse_args(strict=True)
            if args['username'] is "":
                raise Exception('Input is None')
        except:
            abort(400, message="Invalid arguments")

        retval = {'users': persistence.db[code]['users']}

        if args['username'] is None:
            return retval,200

        if args['username'] in persistence.db[code]['users']:
            return {"message": "User is in the party"},200

        abort(404,message="User is not in the party")

    def put(self, code):
        if not code in persistence.db:
            abort(404, message="Code {} doesn't exist".format(code))

        parser = reqparse.RequestParser()
        parser.add_argument('username',required=True)
        try:
            args = parser.parse_args(strict=True)
            if args['username'] is None or args['username'] is "":
                raise Exception('Input is None')
        except:
            abort(400, message="Invalid arguments")

        if args['username'] in persistence.db[code]['users']:
            abort(400, message="User already exists please specify new username")

        correctUsername = args['username'].replace("\"","")
        persistence.db[code]['users'].append(args['username'])

        return {"message": "User has been added"},200


    def post(self, code):
        if not code in persistence.db:
            abort(404, message="Code {} doesn't exist".format(code))

        parser = reqparse.RequestParser()
        parser.add_argument('old_username',required=True)
        parser.add_argument('new_username',required=True)
        try:
            args = parser.parse_args(strict=True)
            if args['old_username'] is "" or args["old_username"] is None or args['new_username'] is "" or args["new_username"] is None:
                raise Exception('Input is None')
        except:
            abort(400, message="Invalid arguments")

        if args['old_username'] not in persistence.db[code]['users']:
            abort(404,message="User is not in the party")

        persistence.db[code]['users'].remove(args['old_username'])
        persistence.db[code]['users'].append(args['new_username'])

        return {"message": "Username has been updated"},200


    def delete(self, code):
        if not code in persistence.db:
            abort(404, message="Code {} doesn't exist".format(code))

        parser = reqparse.RequestParser()
        parser.add_argument('username',required=True)
        try:
            args = parser.parse_args(strict=True)
            if args['username'] is "" or args["username"] is None:
                raise Exception('Input is None')
        except:
            abort(400, message="Invalid arguments")

        if args['username'] not in persistence.db[code]['users']:
            abort(404,message="User is not in the party")

        persistence.db[code]['users'].remove(args['username'])

        return {"message": "Delete Successful"}, 200
