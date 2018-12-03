import requests
import json
from spotipy import oauth2, util, Spotify
from configparser import ConfigParser
from flask import Blueprint, redirect, request, url_for

class TestSetup():

    def __init__(self):

         self.code = self.setUp()

    def setUp(self):

        config = ConfigParser()
        config.read('../config.ini')
        spotify_settings = config['spotify_settings']

        spotifyClientId= spotify_settings['spotifyClientId']
        spotifyClientSecret=spotify_settings['spotifyClientSecret']
        spotifyRedirectURI=spotify_settings['spotifyRedirectURI']
        spotifyScope=spotify_settings['spotifyScope']


        url = ('https://accounts.spotify.com/authorize?client_id='+ spotifyClientId+'&response_type=code&redirect_uri='+spotifyRedirectURI+'&scope='+spotifyScope)

        r = requests.get(url)
        config = ConfigParser()
        config.read('access_token')
        token_info = config['token']

        access_token = token_info['access_token']
        refresh_token = token_info['refresh_token']


        data = {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "expires_in": 3600
               }

        party = requests.put("http://localhost:5000/party/TEST")
        json_code = party.json()
        code = json.dumps(json_code["code"])
        code = code.replace("\"","")

        header = {'Content-Type': 'application/json'}

        r = requests.put("http://localhost:5000/token/"+code,headers=header,json=data)
        r = requests.get("http://localhost:5000/token/"+code)
        r = requests.put("http://localhost:5000/party/"+code+"/user?username=Ross")
        r = requests.get("http://localhost:5000/party/"+code+"/song?track=Umbrella")
        header = {'Conent-Type': 'application/json'}
        data = {'song': r.json()['results'][0]}
        r = requests.put("http://localhost:5000/party/"+code+"/playlist", headers=header, json=data)
        r = requests.get("http://localhost:5000/party/"+code+"/playlist")
        return code

TestData = TestSetup()
