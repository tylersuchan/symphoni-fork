import requests
import unittest
import json

class TestVotingAPI(unittest.TestCase):

    def test_simple_vote(self):

        self.setUp()
        vote_request = requests.put('http://localhost:5000/party/'+self.code+'/vote?vote=up&track_uri=spotify:track:4so0Wek9Ig1p6CRCHuINwW&user=Ross')
        #print(vote_request.text)
        #assert self.playlist["playlist"][0]["vote"] == 3
        pass

    def test_multiple_votes(self):
        pass

    def verify_no_multiple_votes_per_user_per_song(self):
        pass

    def test_vote_count(self):
        pass



    def setUp(self):
        party = requests.put('http://localhost:5000/party/TEST')
        partyCodeJSON = party.json()
        partyCode = json.dumps(partyCodeJSON["code"])
        self.code = partyCode.replace("\"","")
        adduser = requests.put('http://localhost:5000/party/'+self.code+'/user?username=Ross')
        getsong = requests.get('http://localhost:5000/party/'+self.code+'/song?track=White%20Christmas')
        print(getsong.text)
        self.playlist = {
        "playlist": [
            {
                "song": {
                    "track": "White Christmas",
                    "track_uri": "spotify:track:4so0Wek9Ig1p6CRCHuINwW",
                    "album_information": {
                        "album_name": "Holiday Inn (Original Motion Picture Soundtrack)",
                        "album_images": [
                            {
                                "height": 640,
                                "url": "https://i.scdn.co/image/dc436d7374ec79b0a85251ea69a950185241f08c",
                                "width": 640
                            },
                            {
                                "height": 300,
                                "url": "https://i.scdn.co/image/64ff39f86092e2292591a57a2ff0ed65aeb36a92",
                                "width": 300
                            },
                            {
                                "height": 64,
                                "url": "https://i.scdn.co/image/e073d8fbd838ea26d0e014be09c17ae774f34a9c",
                                "width": 64
                            }
                        ],
                        "album_release_date": "1942-01-01",
                        "album_uri": "spotify:album:4ZZvKnA1YJ2KcwjMmHBinq"
                    },
                    "artist_information": [
                        {
                            "artist_name": "Bing Crosby",
                            "artist_uri": "spotify:artist:6ZjFtWeHP9XN7FeKSUe80S"
                        },
                        {
                            "artist_name": "Ken Darby Singers",
                            "artist_uri": "spotify:artist:69UfPJgUmFFAVT740qGVZi"
                        },
                        {
                            "artist_name": "John Scott Trotter & His Orchestra",
                            "artist_uri": "spotify:artist:735L650pvygCZZlPMyHqsN"
                        }
                    ]
                },
                "vote": 2,
                "user_votes": [
                    "Corwyn",
                ]
            },
            {
                "song": {
                    "track": "FREE GLOCKS",
                    "track_uri": "spotify:track:6vbxqqF0Yx3CR3knIKFnDE",
                    "album_information": {
                        "album_name": "GLOCKS IN THE SUMMER VOL. 1",
                        "album_images": [
                            {
                                "height": 640,
                                "url": "https://i.scdn.co/image/b9566e46bd625061d47b5e7b21e1db8a42422255",
                                "width": 640
                            },
                            {
                                "height": 300,
                                "url": "https://i.scdn.co/image/59db91a29acef4d42b95955182b49821c29bba80",
                                "width": 300
                            },
                            {
                                "height": 64,
                                "url": "https://i.scdn.co/image/e3fe1141d038ea39dbc4605de23f7f2762c7a19e",
                                "width": 64
                            }
                        ],
                        "album_release_date": "2016-05-04",
                        "album_uri": "spotify:album:6FhPbTKqYlloW84iBc1tls"
                    },
                    "artist_information": [
                        {
                            "artist_name": "NOLANBEROLLIN",
                            "artist_uri": "spotify:artist:7tWGL5GVOJlbycpq3AgiU9"
                        }
                    ]
                },
                "vote": 1,
                "user_votes": [
                    "Ross",
                    "Tyler",
                    "Corwyn"
                ]
            },
            {
                "song": {
                    "track": "Marvins Room",
                    "track_uri": "spotify:track:047fCsbO4NdmwCBn8pcUXl",
                    "album_information": {
                        "album_name": "Take Care (Deluxe)",
                        "album_images": [
                            {
                                "height": 640,
                                "url": "https://i.scdn.co/image/fc52fd54ad72190904dd0e82055b32c14dee0f04",
                                "width": 640
                            },
                            {
                                "height": 300,
                                "url": "https://i.scdn.co/image/2bfb6efa2497ca04b45de5827b47ace0f68f3232",
                                "width": 300
                            },
                            {
                                "height": 64,
                                "url": "https://i.scdn.co/image/2b3a32e2cf2052291116f90ed29fdf578bead293",
                                "width": 64
                            }
                        ],
                        "album_release_date": "2011",
                        "album_uri": "spotify:album:6X1x82kppWZmDzlXXK3y3q"
                    },
                    "artist_information": [
                        {
                            "artist_name": "Drake",
                            "artist_uri": "spotify:artist:3TVXtAsR1Inumwj472S9r4"
                        }
                    ]
                },
                "vote": 0,
                "user_votes": []
            }
        ],
        "spotify_token_details": {
            "access_token": "BQCyCz83ZKz-MoNO4Vx78HZVf4g9tlF8mwW8rqytgosc4qJxHAqeuxqMDIZKjIZRswbX_LZn8RGP5yc7ejMf7uUK9pE3ItvDGHaFIQ3V6n82R61LgRGeLKGAaeeb1-1cFDW3ie9-13n1pYJYLq_BBgB90c7E5cpWFFnKtLRW0FLHPqyIAUwqCJlkb2CXT4g",
            "expires_in": 3600,
            "refresh_token": "AQBKYnMV-zETK8vqd2BZNNZQcA7fTpzgQV48PZgjscpGdUA4MSKvVutu1dc_mG1RvLwls9IEiFU2CZPiW9nIcdW5cwf4wUYGvCdAimqYLoWEnpWo0-RF8iehEKoeJjdCOHzBMw"
        },
        "users": [
            "Corwyn",
            "Tyler",
            "Ross"
        ]
    }
