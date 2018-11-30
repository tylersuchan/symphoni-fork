import requests
import unittest
import json

class TestSongAPI(unittest.TestCase):

    def setUp(self):

        party = requests.put('http://localhost:5000/party/TEST')
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

    def test_get_song_album(self):

        song_info = requests.get('http://localhost:5000/party/'+self.code+'/song?track=Umbrella')
        print(song_info.json())
        #print(song_info.json()["results"][0]["album_information"]["album_name"])
        assert "Good Girl Gone Bad: Reloaded" in song_info.json()["results"][0]["album_information"]["album_name"]

    def test_get_song_artist(self):

        song_info = requests.get('http://localhost:5000/party/'+self.code+'/song?track=Umbrella')
        assert "Rihanna" in song_info.json()["results"][0]["artist_information"][0]["artist_name"]

    def test_get_song_release_date(self):

        song_info = requests.get('http://localhost:5000/party/'+self.code+'/song?track=Umbrella')
        assert "2008-06-02" in song_info.json()["results"][0]["album_information"]["album_release_date"]

    def test_get_song_track(self):

        song_info = requests.get('http://localhost:5000/party/'+self.code+'/song?track=Umbrella')
        print(song_info.json()["results"][0])
        assert "Umbrella" in song_info.json()["results"][0]["track"]


if __name__ == "__main__":
    unittest.main()
