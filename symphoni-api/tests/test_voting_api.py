import requests
import json
import unittest
from spotipy import oauth2, util, Spotify
from configparser import ConfigParser
from flask import Blueprint, redirect, request, url_for
from set_up_party import TestData

class TestVotingAPI(unittest.TestCase):

    def test_simple_vote(self):

        code = TestData.code
        vote_request = requests.put('http://localhost:5000/party/'+code+'/vote?vote=up&track_uri=spotify:track:49FYlytm3dAAraYgpoJZux&user=Tyler')
        r = requests.get("http://localhost:5000/party/"+code+"/playlist")
        assert r.status_code == 200

    def test_multiple_votes_same_song(self):

        code = TestData.code
        vote_request = requests.put('http://localhost:5000/party/'+code+'/vote?vote=up&track_uri=spotify:track:49FYlytm3dAAraYgpoJZux&user=Corwyn')
        vote_request = requests.put('http://localhost:5000/party/'+code+'/vote?vote=up&track_uri=spotify:track:49FYlytm3dAAraYgpoJZux&user=Joe')
        vote_request = requests.put('http://localhost:5000/party/'+code+'/vote?vote=up&track_uri=spotify:track:49FYlytm3dAAraYgpoJZux&user=Vinny')
        assert vote_request.status_code == 200

    def test_multiple_votes_different_song(self):

        code = TestData.code
        vote_request = requests.put('http://localhost:5000/party/'+code+'/vote?vote=up&track_uri=spotify:track:5UWwZ5lm5PKu6eKsHAGxOk&user=Corwyn')
        vote_request = requests.put('http://localhost:5000/party/'+code+'/vote?vote=up&track_uri=spotify:track:5UWwZ5lm5PKu6eKsHAGxOk&user=Joe')
        vote_request = requests.put('http://localhost:5000/party/'+code+'/vote?vote=up&track_uri=spotify:track:3QmesrvdbPjwf7i40nht1D&user=Corwyn')
        assert vote_request.status_code == 200

    def verify_no_multiple_votes_per_user_per_song(self):

        code = TestData.code
        vote_request = requests.put('http://localhost:5000/party/'+code+'/vote?vote=up&track_uri=spotify:track:49FYlytm3dAAraYgpoJZux&user=Corwyn')
        assert vote_request.status_code == 400
        pass

    def test_vote_count(self):

        code = TestData.code
        r = requests.get("http://localhost:5000/party/"+code+"/playlist")
        self.playlist = r.json()
        assert self.playlist["playlist"][0]["vote"] == 4
