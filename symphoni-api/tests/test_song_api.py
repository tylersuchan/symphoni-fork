import requests
import json
import unittest
from set_up_party import TestData

class TestSongAPI(unittest.TestCase):

    code = TestData.code

    def test_get_song_album(self):

        code = TestData.code
        song_info = requests.get('http://localhost:5000/party/'+code+'/song?track=Umbrella')
        assert "Good Girl Gone Bad: Reloaded" in song_info.json()["results"][0]["album_information"]["album_name"]

    def test_get_song_artist(self):

        code = TestData.code
        song_info = requests.get('http://localhost:5000/party/'+code+'/song?track=Umbrella')
        assert "Rihanna" in song_info.json()["results"][0]["artist_information"][0]["artist_name"]

    def test_get_song_release_date(self):

        code = TestData.code
        song_info = requests.get('http://localhost:5000/party/'+code+'/song?track=Umbrella')
        assert "2008-06-02" in song_info.json()["results"][0]["album_information"]["album_release_date"]

    def test_get_song_track(self):

        code = TestData.code
        song_info = requests.get('http://localhost:5000/party/'+code+'/song?track=Umbrella')
        assert "Umbrella" in song_info.json()["results"][0]["track"]
