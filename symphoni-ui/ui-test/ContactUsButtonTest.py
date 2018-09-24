import unittest
from os import path, getcwd
from driver_picker import DriverPicker
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class ContactUsButtonTest(unittest.TestCase):
        def setUp(self):
            self.GoogleDriver = webdriver.Chrome(DriverPicker().driver_version)
            self.GoogleDriver.get("file://" + path.join(getcwd(), 'public', 'index.html'))

        def test_contact_us_page_source(self):
            driver = self.GoogleDriver
            assert "Contact Us" in driver.page_source
            
        def test_contact_us_button_display(self):
            driver = self.GoogleDriver
            assert driver.find_element_by_id("contactus-button").is_displayed()

        def test_contact_us_button_enabled(self):
            driver = self.GoogleDriver
            assert driver.find_element_by_id("contactus-button").is_enabled()


        def test_contact_us_button_link(self):
            driver = self.GoogleDriver
            element = driver.find_element_by_id("contactus-button").click()
            driver.implicitly_wait(1)
            assert "#contactus" in driver.current_url

        def test_contact_us_display(self):
            driver = self.GoogleDriver
            assert driver.find_element_by_id("contactus").is_displayed()

        def test_contact_us_enabled(self):
            driver = self.GoogleDriver
            assert driver.find_element_by_id("contactus").is_enabled()

        def tearDown(self):
            self.GoogleDriver.close()

