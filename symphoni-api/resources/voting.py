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

        try:
            args = parser.parse_args(strict=True)
            if args['track_uri'] is None or args['track_uri'] is '':
                raise Exception('Please specify a valid track_uri')
        except:
            abort(400, message='Invalid arguments')

        party = persistence.db[code]
        track_uri = args['track_uri']

        matching_song = next((song for song in party['playlist']
                              if song['song']['track_uri'] == track_uri), None)
        if matching_song:
            retval = {
                'message': 'Voting data retreived for {}'.format(matching_song['song']['track']),
                'code': code,
                'vote_data': {
                    'upvotes': matching_song['upvotes'],
                    'downvotes': matching_song['downvotes'],
                    'votes': matching_song['votes'],
                }
            }
            return retval, 200

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
        matching_song = next((song for song in party['playlist']
                              if song['song']['track_uri'] == track_uri), None)

        if user in party['users'] and matching_song:
            if vote == 'up':
                if user in matching_song['upvotes']:
                    matching_song['upvotes'].remove(user)
                elif user in matching_song['downvotes']:
                    matching_song['downvotes'].remove(user)
                    matching_song['upvotes'].append(user)
                else:
                    matching_song['upvotes'].append(user)
            elif vote == 'down':
                if user in matching_song['downvotes']:
                    matching_song['downvotes'].remove(user)
                elif user in matching_song['upvotes']:
                    matching_song['upvotes'].remove(user)
                    matching_song['downvotes'].append(user)
                else:
                    matching_song['downvotes'].append(user)

        sortedPlaylist = sorted(
            party['playlist'], key=lambda k: k['votes'], reverse=True)
        matching_song['votes'] = len(
            matching_song['upvotes']) - len(matching_song['downvotes'])

        persistence.db[code]['playlist'] = sortedPlaylist
        retval = {
            'message': "Vote {} for user {} added successfuly.".format(vote, user),
            'code': code,
            'vote_data': {
                'upvotes': matching_song['upvotes'],
                'downvotes': matching_song['downvotes'],
                'votes': matching_song['votes']
            }
        }
        return retval, 200
