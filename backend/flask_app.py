from services import DriversService as drivers
from services import SessionsService as sessions
from telemetry.enums import DriverStatus
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
    driver_list = list(drivers.find(session['sessionId'],  { 'carIndex' : { '$lt': 20 } }))

    if not session or len(driver_list) == 0:
        return jsonify({'error': 'No data available'}), 404
    
    player = next(driver for driver in driver_list if driver['isPlayer'] == True)
    teammate = next(driver for driver in driver_list if driver['team'] == player['team'] and driver['carIndex'] != player['carIndex'])
    drivers_on_track = [driver for driver in driver_list if driver['driverStatus'] != DriverStatus.IN_GARAGE.name]

    if not player:
        return jsonify({'error': 'No player found'}), 404

    practice_data = {
        'sessionType' : session['sessionType'],
        'playerName' : player['name'],
        'playerTeam' : player['team'],
        'currentSector' : player['currentLap']['activeSector'],
        'tyreSet' : player['currentTyreSet'],
        'timeLeftInSeconds' : session['timeLeft'],
        'driversOnTrack' : drivers_on_track,
        'pitStatus' : player['pitStatus'],
        'lapTimes' : {
            'currentLap' : player['currentLap'],
            'previousLap' : player['previousLap'],
            'personalBest' : player['personalBest'],
            'personalAverage' : player['personalAverage'],
            'fastestLap' : session['fastestLap'],
            'teammateBest' : teammate['personalBest']
        },
        'weather' : {
            'current' : session['weather']['current'],
            'forecasts' : session['weather']['forecasts']
        }
    }

    return dumps(practice_data)