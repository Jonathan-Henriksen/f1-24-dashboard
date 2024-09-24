import sys
from flask import Flask, send_from_directory
from flask_cors import CORS

sys.path.append('.')

_PORT = 5000
_IP = '0.0.0.0'

app = Flask(__name__, static_folder="./build")
CORS(app)

# Route to serve the main React app
@app.route('/')
def serve():
    # Serve the main index.html from the React build folder
    return send_from_directory(app.static_folder, 'index.html')

# Serve static files (JS, CSS, images, etc.) from the build folder
@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

# Run the app
if __name__ == '__main__':
    app.run(debug=True, host=_IP, port=_PORT)
