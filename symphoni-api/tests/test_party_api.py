import requests
import unittest
import json

class TestPartyAPI(unittest.TestCase):

    def test_get_Code_From_Name(self):

        header = { 'Content-Type': 'application/json' }
        data = {"access_token": "BQLvq6", "token_type": "Bearer", "expires_in": 3600, "refresh_token": "ZaT9sI4IDuKJoPRp_Rvp8OsVkoDMQ", "scope": "null"}
        party = requests.put('http://localhost:5000/party/TEST%20', headers=header, json=data)
        partyCodeJSON = party.json()
        partyCode = json.dumps(partyCodeJSON["code"])
        r = requests.get('http://localhost:5000/party/'+partyCode+'%20-X%20')
        assert r is not 404

    def test_get_Error_From_Improper_Name(self):
        
        header = { 'Content-Type': 'application/json' }
        data = {"access_token": "", "token_type": "Bearer", "expires_in": 3600, "refresh_token": "", "scope": "null"}
        party = requests.put('http://localhost:5000/party/#', headers=header, json=data)
        assert "404 Not Found" in party.text

    def test_get_Error_From_Nonexistent_Name(self):

        header = { 'Content-Type': 'application/json' }
        data = {"access_token": "", "token_type": "Bearer", "expires_in": 3600, "refresh_token": "", "scope": "null"}
        party = requests.put('http://localhost:5000/party/', headers=header, json=data)
        assert "404 Not Found" in party.text

    def test_put_Code_From_Valid_Name(self):

        header = { 'Content-Type': 'application/json' }
        data = {"access_token": "", "token_type": "Bearer", "expires_in": 3600, "refresh_token": "", "scope": "null"}
        r = requests.put('http://localhost:5000/party/TEST%20PARTY%20-X%20', headers=header, json=data)
        assert r.text is not None

    def test_put_Code_From_Complex_Name(self):

        header = { 'Content-Type': 'application/json' }
        data = {"access_token": "BQLvq6", "token_type": "Bearer", "expires_in": 3600, "refresh_token": "ZaT9sI4IDuKJoPRp_Rvp8OsVkoDMQ", "scope": "null"}
        r = requests.put('http://localhost:5000/party/-$&@&#@*@%20-X%20', headers=header, json=data)
        assert r.text is not None

    def test_put_Error_From_Invalid_Name(self):

        header = { 'Content-Type': 'application/json' }
        data = {"access_token": "BQLvq6", "token_type": "Bearer", "expires_in": 3600, "refresh_token": "ZaT9sI4IDuKJoPRp_Rvp8OsVkoDMQ", "scope": "null"}
        party = requests.put('http://localhost:5000/party/', headers=header, json=data)
        assert "404 Not Found" in party.text

    def test_post_Check_For_Code_Update(self):

        header = { 'Content-Type': 'application/json' }
        data = {"access_token": "BQLvq6", "token_type": "Bearer", "expires_in": 3600, "refresh_token": "ZaT9sI4IDuKJoPRp_Rvp8OsVkoDMQ", "scope": "null"}
        party = requests.put('http://localhost:5000/party/TEST', headers=header, json=data)
        partyCodeJSON = party.json()
        partyCode = json.dumps(partyCodeJSON["code"])
        newName = requests.post('http://localhost:5000/party/'+partyCode+'%20-d%20"name=NEWTEST"%20-X%20')
        assert newName is not 404

    def test_post_Invalid_Input(self):

        header = { 'Content-Type': 'application/json' }
        data = {"access_token": "BQLvq6", "token_type": "Bearer", "expires_in": 3600, "refresh_token": "ZaT9sI4IDuKJoPRp_Rvp8OsVkoDMQ", "scope": "null"}
        party = requests.post('http://localhost:5000/party/ANGHW8%20-d%20"name=NEWTEST"%20-X%20')
        assert "404" in party.text

    def test_delete_Success(self):

        header = { 'Content-Type': 'application/json' }
        data = {"access_token": "BQLvq6", "token_type": "Bearer", "expires_in": 3600, "refresh_token": "ZaT9sI4IDuKJoPRp_Rvp8OsVkoDMQ", "scope": "null"}
        party = requests.put('http://localhost:5000/party/TEST2', headers=header, json=data)
        partyCodeJSON = party.json()
        partyCode = json.dumps(partyCodeJSON["code"])
        deleteMessage = requests.delete('http://localhost:5000/party/'+partyCode+'%20-X')
        assert deleteMessage is not None

    def test_delete_Failure(self):

        party = requests.delete('http://localhost:5000/party/RANDOM')
        assert "404" in party.text

if __name__ == "__main__":
    unittest.main()
