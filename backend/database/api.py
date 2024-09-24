from database.clients import DriverCollection as drivers
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder="./build")
CORS(app)

def run_flask_app():
    app.run(host='0.0.0.0', port=5000)

@app.route('/api/drivers')
def mfd():
    
    player_driver_data = drivers.find({'is_player' : True})

    if player_driver_data:
        return jsonify(player_driver_data)
    
    return jsonify({'error': 'No data available'}), 404