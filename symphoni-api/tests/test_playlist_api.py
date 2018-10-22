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

    def test_put_song_in_playlist(self):
        header = {"Content-Type": "application/json"}
        party = requests.put('http://localhost:5000/party/'+self.code+'/playlist/',headers=header,json=self.song)
        assert party.json()['party_data']['playlist'][0]  




if __name__ == "__main__":
    unittest.main()
