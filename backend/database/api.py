from .clients import DriversClient
from bson.json_util import dumps
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder="./build")
CORS(app)

def run_flask_app():
    app.run(host='0.0.0.0', port=5000)

@app.route('/api/drivers/<session_id>')
def drivers(session_id):
    
    player_driver_data = DriversClient.find(session_id, {'isPlayer' : True})

    if player_driver_data:
        print(player_driver_data)
        return dumps(player_driver_data)
    
    return jsonify({'error': 'No data available'}), 404