from services import DriversService as drivers
from services import SessionsService as sessions
from bson.json_util import dumps
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder="./build")
CORS(app)

def run_flask_app():
    app.run(host='0.0.0.0', port=9998)

@app.route('/api/sessionType')
def current_session_type():
    session = sessions.find_latest_session()

    return jsonify({'sessionType' : session['sessionType']})

@app.route('/api/practice')
def practice():
    session = sessions.find_latest_session()
    driver_list = list(drivers.find(session['sessionId'],  { 'carIndex' : { '$lte': 20 } }))

    if not session or len(driver_list) == 0:
        return jsonify({'error': 'No data available'}), 404
    
    player = next(driver for driver in driver_list if driver['isPlayer'] == True)
    fastest_driver = max(driver_list, key=lambda driver: driver['lapTimeBest'])

    if not player:
        return jsonify({'error': 'No player found'}), 404

    practice_data = {
        'playerName' : player['name'],
        'playerTeam' : player['team'],
        'tyreSet' : session['currentTyreSet'],
        'timeLeftInSeconds' : session['timeLeft'],
        'fastestLap' : {
            'driverName' : fastest_driver['name'],
            'driverTeam' : fastest_driver['team'],
            'time' : fastest_driver['lapTimeBest']
        },
        'lapTimes' : {
            'current' : player['lapTimeCurrent'],
            'currentInvalid' : player['lapTimeCurrentInvalid'],
            'personalBest' : player['lapTimeBest'],
            'previous' : player['lapTimePrevious']
        },
        'weather' : {
            'current' : session['weather']['current'],
            'forecasts' : session['weather']['forecasts']
        }
    }

    return dumps(practice_data)