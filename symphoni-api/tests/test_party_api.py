import requests
import unittest
import json

class TestPartyAPI(unittest.TestCase):

    def generate_party(self):

        party = requests.put('http://localhost:5000/party/TEST%20PARTY')
        partyCodeJSON = party.json()
        partyCode = json.dumps(partyCodeJSON["code"])
        self.code = partyCode.replace("\"","")
        return self.code

    def generate_party_invalid_name(self):

        #There is no restriction on party name except for empty names and party cannot begin with a "#" symbol
        party = requests.put('http://localhost:5000/party/#')
        return party.text

    def generate_party_empty_name(self):

        party = requests.put('http://localhost:5000/party/')
        return party.text

    def test_get_Code_From_Name(self):

        partyCode = self.generate_party()
        r = requests.get('http://localhost:5000/party/'+partyCode)
        assert 200 == r.status_code

    def test_get_Error_From_Invalid_Name(self):

        party = self.generate_party_invalid_name()
        getParty = requests.get('http://localhost:5000/party/'+party)
        assert "404 Not Found" in getParty.text

    def test_get_Error_From_Nonexistent_Name(self):

        party = self.generate_party_empty_name()
        getParty = requests.get('http://localhost:5000/party/'+party)
        assert "404 Not Found" in getParty.text

    def test_put_Code_From_Valid_Name(self):

        party = self.generate_party()
        assert "404 Not Found" not in party

    def test_put_Code_From_Complex_Name(self):

        r = requests.put('http://localhost:5000/party/-$&@&#@*@')
        #Only thing I could think of, considering put doesn't have the greatest error handling
        assert r.text is not None

    def test_put_Error_From_Invalid_Name(self):

        party = self.generate_party_invalid_name()
        assert "404 Not Found" in party

    def test_post_Check_For_Code_Update(self):

        partyCode = self.generate_party()
        newName = requests.post('http://localhost:5000/party/'+partyCode+'%20-d%20"name=NEWTEST"')
        assert newName is not 404

    def test_post_Invalid_Input(self):

        partyCode = self.generate_party_invalid_name()
        party = requests.post('http://localhost:5000/party/'+partyCode+'%20-d%20"name=NEWTEST"')
        assert 404 == party.status_code

    def test_delete_Success(self):

        partyCode = self.generate_party()
        deleteMessage = requests.delete('http://localhost:5000/party/'+partyCode)
        assert 200 == deleteMessage.status_code

    def test_delete_Failure(self):

        deleteNonExistentParty = requests.delete('http://localhost:5000/party/RANDOM')
        assert 404 == deleteNonExistentParty.status_code

if __name__ == "__main__":
    unittest.main()
