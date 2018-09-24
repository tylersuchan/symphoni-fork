import platform
from os import getcwd, path

class DriverPicker():

    def __init__(self):
        self.driver_version = self.getDriver()
            
    def getDriver(self):
        operating_system = platform.system()
        drivers_dir = path.join(getcwd(), path.dirname(__file__), 'Webdrivers')
        if operating_system == 'Windows':
            return path.join(drivers_dir, 'chromedriver_windows.exe')
        elif operating_system == 'Linux':
            return path.join(drivers_dir, 'chromedriver_linux')
        else:
            return path.join(drivers_dir, 'chromedriver_mac')
