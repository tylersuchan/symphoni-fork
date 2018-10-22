import requests
import unittest
import json

class TestSongAPI(unittest.TestCase):

    def setUp(self):

        header = { 'Content-Type': 'application/json' }
        data = {"access_token": "BQBbUtO0zNoA1Z-a5PMrWgFr2heUMEtp_z1DFS0SGSL3LCkuYbDi1qmiqVvGhRi1qOv46OkmpFJvH3j5CE0d4nnZYQr4-qsXDZu8_945M7pRb5yZoAhWOkKRPNNvWgVmqQBvkii1pr2kIut8ML9a27_q6jhe7J35PHAFq7JLwMmOFM7b8Xk", "expires_in": 3600, "refresh_token": "AQDc6dM6K8dOkVvGnZVEjCjraH6N5M6s_OE3kbeUAGs1jtqNH1gQPdW9C99GQDK6SUDhw1g522hfR38KCxbs6vway8vfwGVIZY1uXcaeDIFDeceP6u62uzSSMmc1AMia6vPOXA"}
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

    def test_get_song_album(self):

        song_info = requests.get('http://localhost:5000/party/'+self.code+'/song/?track=Umbrella')
        assert "Good Girl Gone Bad: Reloaded" in song_info.json()["results"][0]["album_information"]["album_name"]

    def test_get_song_artist(self):

        song_info = requests.get('http://localhost:5000/party/'+self.code+'/song/?track=Umbrella')
        assert "Rihanna" in song_info.json()["results"][0]["artist_information"][0]["artist_name"]

    def test_get_song_release_date(self):

        song_info = requests.get('http://localhost:5000/party/'+self.code+'/song/?track=Umbrella')
        assert "2008-06-02" in song_info.json()["results"][0]["album_information"]["album_release_date"]

    def test_get_song_track(self):

        song_info = requests.get('http://localhost:5000/party/'+self.code+'/song/?track=Umbrella')
        print(song_info.json()["results"][0])
        assert "Umbrella" in song_info.json()["results"][0]["track"] 


if __name__ == "__main__":
    unittest.main()


