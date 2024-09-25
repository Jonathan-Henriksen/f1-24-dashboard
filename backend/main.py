from flask_app import run_flask_app
from udp_listener import run_udp_listener

import threading

if __name__ == '__main__':
	udp_thread = threading.Thread(target=run_udp_listener)
	flask_thread = threading.Thread(target=run_flask_app)

	udp_thread.start()
	flask_thread.start()

	udp_thread.join()
	flask_thread.join()