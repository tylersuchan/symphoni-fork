import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class startButtonTests(unittest.TestCase):
    def setUp(self):
        self.GoogleDriver = webdriver.Chrome("C:\\Users\\Ohad\\symphoni\\symphoni-ui\\Tests\\chromedriver.exe")
        self.GoogleDriver.get("C:\\Users\\Ohad\\symphoni\\symphoni-ui\\public\\index.html")

    def test_start_exists(self):
        driver = self.GoogleDriver
        assert "Start Party" in driver.page_source

    def test_check_button(self):
        driver = self.GoogleDriver
        driver.implicitly_wait(1)
        assert driver.find_element_by_id("start") != None

    def test_anchor(self):
        driver = self.GoogleDriver
        driver.implicitly_wait(1)
        driver.find_element_by_id("start-button").click()
        driver.implicitly_wait(1)
        assert '#start' in driver.current_url

    def tearDown(self):
        self.GoogleDriver.close()

if __name__ == "__main__":
    unittest.main()
