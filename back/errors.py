class InvalidFormatFile(Exception):
    def __init__(self, msg):
        super().__init__(msg)

class InvalidFormatData(Exception):
    def __init__(self, msg):
        super().__init__(msg)