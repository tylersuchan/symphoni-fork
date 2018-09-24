import unittest

import join_button
import start_party_button
import queue
import privacy_button
import music_queue
import contact_button

loader = unittest.TestLoader()
suite = unittest.TestSuite()
runner = unittest.TextTestRunner(verbosity=3)

suite.addTests(loader.loadTestsFromModule(join_button))
suite.addTests(loader.loadTestsFromModule(start_party_button))
suite.addTests(loader.loadTestsFromModule(queue))
suite.addTests(loader.loadTestsFromModule(privacy_button))
suite.addTests(loader.loadTestsFromModule(music_queue))
suite.addTests(loader.loadTestsFromModule(contact_button))

runner.run(suite)
