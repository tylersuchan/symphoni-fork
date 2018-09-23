import unittest

import join_button
import start_party_button

loader = unittest.TestLoader()
suite = unittest.TestSuite()
runner = unittest.TextTestRunner(verbosity=3)

suite.addTests(loader.loadTestsFromModule(join_button))
suite.addTests(loader.loadTestsFromModule(start_party_button))

runner.run(suite)
