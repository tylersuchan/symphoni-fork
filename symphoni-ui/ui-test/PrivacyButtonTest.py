import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys



class PrivacyButtonTest(unittest.TestCase):

    def setUp(self):
        self.GoogleDriver = webdriver.Chrome()
        self.FirefoxDriver= webdriver.Firefox()
        self.location = "file:///home/ross/CSE442/symphoni/symphoni-ui/public/index.html"

    def test1(self):
        driver = self.GoogleDriver
        driver.get(self.location)
        assert "Privacy Policy" in driver.page_source

    def test2(self):
        driver = self.GoogleDriver
        driver.get(self.location)
        driver.implicitly_wait(1)
        assert driver.find_element_by_xpath("""//*[@id="root"]/h3/a""").is_displayed()

    def test3(self):
        driver = self.GoogleDriver
        driver.get(self.location)
        driver.implicitly_wait(1)
        assert driver.find_element_by_xpath("""//*[@id="root"]/h3/a""").is_enabled()



    def test4(self):
        driver = self.FirefoxDriver
        driver.get(self.location)
        driver.implicitly_wait(1)
        
        element = driver.find_element_by_xpath("""//*[@id="root"]/h3/a""").click()
        driver.implicitly_wait(1)
        assert '#privacy' in driver.current_url

    def test5(self):
        driver = self.GoogleDriver
        driver.get(self.location)
        driver.implicitly_wait(1)
        element = driver.find_element_by_xpath("""//*[@id="root"]/h3/a""").click()
        driver.implicitly_wait(1)
        assert '#privacy' in driver.current_url


    def test6(self):
        driver = self.GoogleDriver
        driver.get(self.location)
        driver.implicitly_wait(1)
        assert driver.find_element_by_id("privacy").is_displayed()
 

    def test7(self):
        driver = self.GoogleDriver
        driver.get(self.location)
        driver.implicitly_wait(1)
        assert driver.find_element_by_id("privacy").is_enabled()

    def tearDown(self):
        self.GoogleDriver.close()
        self.FirefoxDriver.close()


if __name__ == "__main__":
    unittest.main()
