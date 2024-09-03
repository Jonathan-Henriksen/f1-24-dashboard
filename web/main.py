import json, sys

sys.path.append('.')

from database.repositories import *
from flask import Flask, jsonify, render_template

_PORT = 5000
_IP = '0.0.0.0'

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/mfd')
def mfd():
    mfd_json = load_mfd_json()

    if mfd_json:
        return jsonify(json.loads(mfd_json))
    
    return jsonify({'error': 'No data available'}), 404

if __name__ == '__main__':
    app.run(debug=True, host=_IP, port=_PORT)
