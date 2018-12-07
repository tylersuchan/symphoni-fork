from flask_restful import reqparse, Resource, abort
import random
import string
import persistence
import json


class Voting(Resource):
    def get(self, code):
        if not code in persistence.db:
            abort(404, message="Code {} doesn't exist".format(code))

        parser = reqparse.RequestParser()
        parser.add_argument('track_uri', type=str,
                            location='args', required=True)
        parser.add_argument('user', type=str, location='args', required=True)

        try:
            args = parser.parse_args(strict=True)
            if args['track_uri'] is None or args['track_uri'] is '':
                raise Exception('Please specify a valid track_uri')
            if args['user'] is None or args['user'] is '':
                raise Exception('Please enter a valid user in the party')
        except:
            abort(400, message='Invalid arguments')

        party = persistence.db[code]

        if user in ['users']:
            pass

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
            if not('up' in args['vote'] or ('down' in args['vote'])):
                raise Exception('Please specify vote (up or down)')
            if args['track_uri'] is None or args['track_uri'] is '':
                raise Exception('Please specify a valid track_uri')
            if args['user'] is None or args['user'] is '':
                raise Exception('Please enter a valid user in the party')
        except:
            abort(400, message='Invalid arguments')

        party = persistence.db[code]
        user = args['user']
        vote = args['vote']
        track_uri = args['track_uri']
        voted_song = None

        if user in party['users']:
            for item in party['playlist']:
                if item['song']['track_uri'] == track_uri:
                    voted_song = item
                    if vote == 'up':
                        if user in item['upvotes']:
                            item['upvotes'].remove(user)
                        elif user in item['downvotes']:
                            item['downvotes'].remove(user)
                            item['upvotes'].append(user)
                        else:
                            item['upvotes'].append(user)
                    elif vote == 'down':
                        if user in item['downvotes']:
                            item['downvotes'].remove(user)
                        elif user in item['upvotes']:
                            item['upvotes'].remove(user)
                            item['downvotes'].append(user)
                        else:
                            item['downvotes'].append(user)
                sortedPlaylist = sorted(
                    party['playlist'], key=lambda k: k['votes'], reverse=True)
                item['votes'] = len(item['upvotes']) - len(item['downvotes'])

        persistence.db[code]['playlist'] = sortedPlaylist
        retval = {
            'message': "Vote {} for user {} added successfuly.".format(vote, user),
            'code': code,
            'vote_data': {
                'upvotes': voted_song['upvotes'],
                'downvotes': voted_song['downvotes'],
                'votes': voted_song['votes']
            }
        }
        return retval, 200
