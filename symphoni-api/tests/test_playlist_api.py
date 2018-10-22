import requests
import unittest
import json

class TestPlaylistAPI(unittest.TestCase):
    
    def setUp(self):
        header = { 'Content-Type': 'application/json' }
        data = {"access_token": "BQLvq6", "expires_in": 3600, "refresh_token": "ZaT9sI4IDuKJoPRp_Rvp8OsVkoDMQ"}
        party = requests.put('http://localhost:5000/party/TEST', headers=header, json=data)
        partyCodeJSON = party.json()
        partyCode = json.dumps(partyCodeJSON["code"])
        self.code = partyCode.replace("\"","")
        self.song = { "song": {
            "track": "Umbrella",
            "track_uri": "spotify:track:49FYlytm3dAAraYgpoJZux",
            "album_information": {
                "album_name": "Good Girl Gone Bad: Reloaded",
                "album_images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/3efc0f573fec8acaefe7b5cdf7004d03939b0c34",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/bce0e821755b24afe7cece9e8d73620df7274dcf",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/e4877c9b1f210ffd5715eef7a80b15bf825c09e3",
                        "width": 64
                    }
                ],
                "album_release_date": "2008-06-02",
                "album_uri": "spotify:album:3JSWZWeTHF4HDGt5Eozdy7"
            },
            "artist_information": [
                {
                    "artist_name": "Rihanna",
                    "artist_uri": "spotify:artist:5pKCCKE2ajJHZ9KAiaK11H"
                },
                {
                    "artist_name": "JAY Z",
                    "artist_uri": "spotify:artist:3nFkdlSjzX9mRTtwJOzDYB"
                }
            ]
        }}

    def test_get_party_playlist(self):
        
        party = requests.get('http://localhost:5000/party/'+self.code+'/playlist/')
        assert party.json()['playlist'] is not []
    
    def test_get_invalid_playlist(self):
        party = requests.get('http://localhost:5000/party/NOTVALID/playlist/')
        assert "404" in party.text

    def test_put_song_in_playlist(self):
        header = {"Content-Type": "application/json"}
        party = requests.put('http://localhost:5000/party/'+self.code+'/playlist/',headers=header,json=self.song)
        assert party.json()['party_data']['playlist'][0]  

    def test_put_invalid_code(self):
        header = {"Content-Type": "application/json"}
        party = requests.put('http://localhost:5000/party/NOTVALID/playlist/',headers=header,json=self.song)
        
        assert "404" in party.text

    def test_put_invalid_json(self):
        header = {"Content-Type": "application/json"}
        party = requests.put('http://localhost:5000/party/'+self.code+'/playlist/',headers=header,json={'song': 'test'} )

        assert "Invalid JSON" in party.text


    def test_delete_song_in_playlist(self):
        header = {"Content-Type": "application/json"}
        party = requests.delete('http://localhost:5000/party/'+self.code+'/playlist/?track_uri=spotify%3Atrack%3A49FYlytm3dAAraYgpoJZux')
        assert not party.json()['party_data']['playlist']  
 

    def test_delete_invalid_query(self):
        party = requests.delete('http://localhost:5000/party/'+self.code+'/playlist/?invalid_parameter=invalidsong')
        assert "Invalid Input" in party.text

    def test_delete_invalid_song_in_playlist(self):
        header = {"Content-Type": "application/json"}
        party = requests.put('http://localhost:5000/party/'+self.code+'/playlist/',headers=header,json=self.song)
        playlist = party.json()['party_data']['playlist'][0]  
        
        party = requests.delete('http://localhost:5000/party/'+self.code+'/playlist/?track_uri=invalidsong')
        assert party.json()['party_data']['playlist'][0] == playlist


    def test_delete_invalid_code(self):
        party = requests.delete('http://localhost:5000/party/NOTVALID/playlist/')
        assert "404" in party.text

    def test_get_put(self):
        header = {"Content-Type": "application/json"}
        party = requests.put('http://localhost:5000/party/'+self.code+'/playlist/',headers=header,json=self.song)
        
        party = requests.get('http://localhost:5000/party/'+self.code+'/playlist/')

        assert len(party.json()['playlist'][0]) != 0


if __name__ == "__main__":
    unittest.main()
