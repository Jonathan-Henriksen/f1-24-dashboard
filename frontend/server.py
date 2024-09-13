import json
import sys
from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS

sys.path.append('.')

from database.repositories import load_mfd_json  # Assuming this is your import for telemetry data

_PORT = 5000
_IP = '0.0.0.0'

# Set up Flask app
app = Flask(__name__, static_folder="./build")
CORS(app)

# Route to serve the main React app
@app.route('/')
def serve():
    # Serve the main index.html from the React build folder
    return send_from_directory(app.static_folder, 'index.html')

# API route to serve telemetry data
@app.route('/api/mfd')
def mfd():
    # Load telemetry data from the backend (assuming you have this function)
    mfd_json = load_mfd_json()

    if mfd_json:
        return jsonify(json.loads(mfd_json))
    
    return jsonify({'error': 'No data available'}), 404

# Serve static files (JS, CSS, images, etc.) from the build folder
@app.route('/<path:path>')
def static_proxy(path):
    # Serve static files from the React build directory
    return send_from_directory(app.static_folder, path)

# Run the app
if __name__ == '__main__':
    app.run(debug=True, host=_IP, port=_PORT)
