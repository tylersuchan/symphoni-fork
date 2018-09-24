import unittest
from os import path, getcwd
from driver_picker import DriverPicker
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


class MusicQueueTest(unittest.TestCase):
    def setUp(self):
        self.GoogleDriver = webdriver.Chrome(DriverPicker().driver_version)
        self.GoogleDriver.get("file://" + path.join(getcwd(), 'public', 'index.html'))
    
    def test_playlist_text_exists(self):
        driver = self.GoogleDriver
        assert "Your Playlist" in driver.page_source
    
    def test_queue_entry_count(self):
        driver = self.GoogleDriver
        entry_count = 2
        entries = driver.find_elements_by_class_name('queue-entry')
        assert len(entries) == entry_count
    
    def test_song_name(self):
        driver = self.GoogleDriver
        song_divs = driver.find_elements_by_css_selector('.queue-entry div:nth-child(2) div:nth-child(1)')
        assert song_divs[0].text == '4th Dimension'
   
    def test_artist_name(self):
        driver = self.GoogleDriver
        artist_divs = driver.find_elements_by_css_selector('.queue-entry div:nth-child(2) div:nth-child(2)')
        assert artist_divs[0].text == 'Kanye West'

    def test_album_name(self):
        driver = self.GoogleDriver
        album_divs = driver.find_elements_by_css_selector('.queue-entry div:nth-child(2) div:nth-child(3)')
        assert album_divs[0].text == 'Kids See Ghosts'

    def tearDown(self):
        self.GoogleDriver.close()
