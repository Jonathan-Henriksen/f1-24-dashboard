import json
import helpers.database_helper as db_helper
from flask import Flask, jsonify, render_template

_PORT = 5000
_IP = '0.0.0.0'

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/latest_tyre_info')
def latest_tyre_info():
    tyre_info = db_helper.get_latest_tyre_info()
    if tyre_info:
        return jsonify(json.loads(tyre_info))
    return jsonify({'error': 'No data available'}), 404

if __name__ == '__main__':
    app.run(debug=True, host=_IP, port=_PORT)
