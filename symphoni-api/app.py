from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from resources.party import Party
import persistence

persistence.init()

app = Flask(__name__)
api = Api(app)
CORS(app, resources={r'/*': {'origins': '*'}})

api.add_resource(Party,'/party/<string:name>')

if __name__ == '__main__':
    app.run(debug=True)
