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
        vote_request = requests.put('http://localhost:5000/party/'+code+'/vote?vote=up&track_uri=spotify:track:49FYlytm3dAAraYgpoJZux&user=Ross')
        r = requests.get("http://localhost:5000/party/"+code+"/playlist")
        self.playlist = r.json()
        assert self.playlist["playlist"][0]["vote"] == 1

    def test_multiple_votes(self):
        pass

    def verify_no_multiple_votes_per_user_per_song(self):
        pass

    def test_vote_count(self):
        pass
