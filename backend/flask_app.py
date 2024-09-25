from services import DriversService as drivers
from services import SessionsService as sessions
from bson.json_util import dumps
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder="./build")
CORS(app)

def run_flask_app():
    app.run(host='0.0.0.0', port=5000)

@app.route('/api/latestSessionId')
def session_latest_id():
    session = sessions.find_latest_session()

    return jsonify({'sessionId' : session['sessionId']})

@app.route('/api/sessions/<session_id>')
def session_by_id(session_id):
    session = None

    if session_id == 'latest':
        session = sessions.find_latest_session()
    else:
        session = sessions.find_by_session_id(session_id)

    return handle_result(session)

@app.route('/api/drivers/<session_id>')
def drivers_by_session_id(session_id):
    player_driver_data = drivers.find(session_id, {'isPlayer' : True})

    return handle_result(player_driver_data)


def handle_result(result):
    if (result):
        return dumps(result)
    
    return jsonify({'error': 'No data available'}), 404
