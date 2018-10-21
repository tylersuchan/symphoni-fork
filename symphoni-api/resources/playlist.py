from flask_restful import reqparse, Resource
import string
import persistence
import spotipy
import json

class Playlist(Resource):
    def get(self, code):
        if not code in persistence.db:
            return 404

        retval = {'playlist': persistence.db[code]['playlist'] }
        return retval,200 

    def put(self, code):
        if not code in persistence.db:
            return 404

        parser = reqparse.RequestParser()
        parser.add_argument('song',type=str,location='json',required=True)
        try:
            args = parser.parse_args(strict=True)
        except:
            return {"message": "Invalid Input"},400

        args["song"]
        json_acceptable_string = args["song"].replace("'","\"")
        try:
            song = json.loads(json_acceptable_string)
        except:
            return {"message": "Invalid JSON"},400

        playlist_item = {
            "song": song,
            "vote": 0
        }

        persistence.db[code]["playlist"].append(playlist_item)

        retval = {'code': code, 'party_data': persistence.db[code]}
        return retval, 201

    def post(self,code):
        if not code in persistence.db:
            return 404
        
        parser = reqparse.RequestParser()
        parser.add_argument('track_uri',type=str,required=True)
        parser.add_argument('vote',type=str,required=True)
        try:
            args = parser.parse_args(strict=True)
        except:
            return {"message": "Invalid Input"},400

        if((args["vote"] != "up") or (args["vote"] != "down")):
            return {"message": "Please specify vote (up or down)"},400

        found = False
        for item in persistence.db[code]["playlist"]:
            if item["song"]["track_uri"] == args["track_uri"]:
                item["vote"] = item["vote"]+1 if args["vote"] == "up" else item["vote"]-1 
                found = True
                break
        
        if(not found):
            return {"message","Song not found in playlist"},404

        newlist = sorted(persistence.db[code]["playlist"],key=lambda k: k["vote"], reverse=True)
        persistence.db[code]["playlist"] = newlist
        retval = {'code': code, 'party_data': persistence.db[code]}
        return retval,201

    def delete(self,code): 
        if not code in persistence.db:
            return 404
        
        try:
            del persistence.db[code]
        except:
            return 500
        
        return {"message": "Delete Successful"},200



