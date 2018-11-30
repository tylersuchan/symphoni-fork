import requests
import unittest
import json

class TestUserApi(unittest.TestCase):

    def generate_party(self):

        party = requests.put('http://localhost:5000/party/TEST%20PARTY')
        partyCodeJSON = party.json()
        partyCode = json.dumps(partyCodeJSON["code"])
        self.code = partyCode.replace("\"","")
        return self.code

    def test_add_user_to_party(self):

        partyCode = self.generate_party()
        newUser = requests.put("http://localhost:5000/party/"+partyCode+"/user?username=Ross")
        assert 200 == newUser.status_code

    def test_add_invalid_input_to_party(self):

        partyCode = self.generate_party()
        newUser = requests.put("http://localhost:5000/party/"+partyCode+"/user?username=")
        assert 400 == newUser.status_code

    def test_add_non_unique_user_to_party(self):

        partyCode = self.generate_party()
        oldUser = requests.put("http://localhost:5000/party/"+partyCode+"/user?username=Ross")
        newUser = requests.put("http://localhost:5000/party/"+partyCode+"/user?username=Ross")
        assert 400 == newUser.status_code

    def test_get_user_successfully_in_party(self):

        partyCode = self.generate_party()
        newUser = requests.put("http://localhost:5000/party/"+partyCode+"/user?username=Ross")
        obtainedUser = requests.get("http://localhost:5000/party/"+partyCode+"/user?username=Ross")
        assert 200 == obtainedUser.status_code

    def test_get_user_not_in_party(self):

        partyCode = self.generate_party()
        newUser = requests.put("http://localhost:5000/party/"+partyCode+"/user?username=Ross")
        obtainedUser = requests.get("http://localhost:5000/party/"+partyCode+"/user?username=Tyler")
        assert 404 == obtainedUser.status_code

    def test_get_list_of_users(self):

        partyCode = self.generate_party()
        newUser = requests.put("http://localhost:5000/party/"+partyCode+"/user?username=Ross")
        newUser2 = requests.put("http://localhost:5000/party/"+partyCode+"/user?username=Tyler")
        newUser3 = requests.put("http://localhost:5000/party/"+partyCode+"/user?username=Corwyn")
        obtainedUsers = requests.get("http://localhost:5000/party/"+partyCode+"/user")
        userList = obtainedUsers.json()['users']
        assert "Ross" in userList and "Tyler" in userList and "Corwyn" in userList

    def test_update_invalid(self):

        partyCode = self.generate_party()
        newUser = requests.put("http://localhost:5000/party/"+partyCode+"/user?username=Ross")
        updatedUser = requests.post("http://localhost:5000/party/"+partyCode+"/user?old_username=&new_username=Tyler")
        assert 400 == updatedUser.status_code

    def test_update_user_no_exist(self):

        partyCode = self.generate_party()
        newUser = requests.put("http://localhost:5000/party/"+partyCode+"/user?username=Ros")
        updatedUser = requests.post("http://localhost:5000/party/"+partyCode+"/user?old_username=Ross&new_username=Tyler")
        assert 404 == updatedUser.status_code

    def test_update_successful(self):

        partyCode = self.generate_party()
        newUser = requests.put("http://localhost:5000/party/"+partyCode+"/user?username=Ross")
        updatedUser = requests.post("http://localhost:5000/party/"+partyCode+"/user?old_username=Ross&new_username=Tyler")
        verification = requests.get("http://localhost:5000/party/"+partyCode+"/user?username=Tyler")
        assert 200 == verification.status_code

    def test_delete_invalid_input(self):

        partyCode = self.generate_party()
        newUser = requests.put("http://localhost:5000/party/"+partyCode+"/user?username=Tyler")
        deletedUser = requests.delete("http://localhost:5000/party/"+partyCode+"/user")
        assert 400 == deletedUser.status_code

    def test_delete_invalid_user(self):

        partyCode = self.generate_party()
        newUser = requests.put("http://localhost:5000/party/"+partyCode+"/user?username=Tyler")
        deletedUser = requests.delete("http://localhost:5000/party/"+partyCode+"/user?username=Ross")
        assert 404 == deletedUser.status_code

    def test_delete_successful(self):

        partyCode = self.generate_party()
        newUser = requests.put("http://localhost:5000/party/"+partyCode+"/user?username=Ross")
        deletedUser = requests.delete("http://localhost:5000/party/"+partyCode+"/user?username=Ross")
        assert 200 == deletedUser.status_code
