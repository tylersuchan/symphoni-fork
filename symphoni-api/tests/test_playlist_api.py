import requests
import unittest
import json
from set_up_party import TestData

class TestPlaylistAPI(unittest.TestCase):


    def test_get_party_playlist(self):

        code = TestData.code
        party = requests.get('http://localhost:5000/party/'+code+'/playlist')
        assert party.json()['playlist'] is not []

    def test_get_invalid_playlist(self):

        code = TestData.code
        party = requests.get('http://localhost:5000/party/NOTVALID/playlist/')
        assert 404 == party.status_code

    def test_put_song_in_playlist(self):

        code = TestData.code
        r = requests.get("http://localhost:5000/party/"+code+"/song?track=Everlong")
        header = {'Conent-Type': 'application/json'}
        data = {'song': r.json()['results'][0]}
        r = requests.put("http://localhost:5000/party/"+code+"/playlist", headers=header, json=data)
        assert r.json()['party_data']['playlist'][0] is not None

    def test_put_invalid_code(self):

        code = TestData.code
        r = requests.get("http://localhost:5000/party/"+code+"/song?track=Everlong")
        header = {'Conent-Type': 'application/json'}
        data = {'song': r.json()['results'][0]}
        party = requests.put('http://localhost:5000/party/NOTVALID/playlist/',headers=header,json=data)
        assert 404 == party.status_code

    def test_put_invalid_json(self):

        code = TestData.code
        header = {"Content-Type": "application/json"}
        party = requests.put('http://localhost:5000/party/'+code+'/playlist/',headers=header,json={'song': 'test'} )
        assert 404 == party.status_code

    def test_delete_song_in_playlist(self):

        code = TestData.code
        header = {"Content-Type": "application/json"}
        party = requests.delete('http://localhost:5000/party/'+code+'/playlist?track_uri=spotify:track:49FYlytm3dAAraYgpoJZux', headers=header)
        print(party.status_code)
        assert 200 == party.status_code

    def test_delete_invalid_query(self):

        code = TestData.code
        party = requests.delete('http://localhost:5000/party/'+code+'/playlist/?invalid_parameter=invalidsong')
        assert 404 == party.status_code

    def test_delete_invalid_song_in_playlist(self):

        code = TestData.code
        r = requests.get("http://localhost:5000/party/"+code+"/song?track=Sorry")
        data = {'song': r.json()['results'][0]}
        header = {"Content-Type": "application/json"}
        party = requests.put('http://localhost:5000/party/'+code+'/playlist/',headers=header,json=data)
        party = requests.delete('http://localhost:5000/party/'+code+'/playlist/?track_uri=invalidsong')
        assert 404 == party.status_code


    def test_delete_invalid_code(self):

        party = requests.delete('http://localhost:5000/party/NOTVALID/playlist/')
        assert "404" in party.text

    def test_get_put(self):

        code = TestData.code
        party = requests.get("http://localhost:5000/party/"+code+"/song?track=Everlong")
        header = {'Conent-Type': 'application/json'}
        data = {'song': party.json()['results'][1]}
        party = requests.put("http://localhost:5000/party/"+code+"/playlist", headers=header, json=data)
        party = requests.get('http://localhost:5000/party/'+code+'/playlist')
        assert 200 == party.status_code
