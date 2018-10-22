from flask import Flask
from flask_restful import Api
from resources.party import Party
import persistence

persistence.init()

app = Flask(__name__)
api = Api(app)

api.add_resource(Party, '/party/<string:name>')

if __name__ == '__main__':
    app.run(debug=True)
