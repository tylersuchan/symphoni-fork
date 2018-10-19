import unittest
import test_party_api

loader = unittest.TestLoader()
suite = unittest.TestSuite()
runner = unittest.TextTestRunner(verbosity=3)

suite.addTests(loader.loadTestsFromModule(test_party_api))

runner.run(suite)
