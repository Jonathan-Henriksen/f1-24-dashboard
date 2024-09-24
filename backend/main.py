import threading
from database.api import run_flask_app
from telemetry.udp_listener import run_udp_listener

if __name__ == '__main__':
	udp_thread = threading.Thread(target=run_udp_listener)
	flask_thread = threading.Thread(target=run_flask_app)

	udp_thread.start()
	flask_thread.start()

	udp_thread.join()
	flask_thread.join()