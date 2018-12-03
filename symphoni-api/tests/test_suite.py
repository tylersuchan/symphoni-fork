import unittest
import test_party_api
import test_song_api
import test_playlist_api
import test_user_api
import test_voting_api

loader = unittest.TestLoader()
suite = unittest.TestSuite()
runner = unittest.TextTestRunner(verbosity=3)


suite.addTests(loader.loadTestsFromModule(test_party_api))
suite.addTests(loader.loadTestsFromModule(test_playlist_api))
suite.addTests(loader.loadTestsFromModule(test_song_api))
suite.addTests(loader.loadTestsFromModule(test_user_api))
suite.addTests(loader.loadTestsFromModule(test_voting_api))

runner.run(suite)
