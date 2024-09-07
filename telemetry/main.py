import socket, sys, json

sys.path.append('.')

from database.models import *
from database.repositories import init_db, save_mfd

from enums import PacketIDs

from packets import *

_PORT = 9999
_IP = '0.0.0.0'

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((_IP, _PORT))

# MDF Panels
multi_function_display = MultiFunctionDisplay()

def to_json(obj):
    return json.dumps(obj, default=lambda o: o.__dict__)

def start_server():
	print(f"Listening for UDP packets on port {_PORT}...")
	while True:
		data, _ = sock.recvfrom(2048)
		handle_packet(data)

def handle_packet(data: bytes):
	if len(data) >= PACKET_HEADER_FORMAT_SIZE:
			packet_header_bytes = data[:PACKET_HEADER_FORMAT_SIZE]
			packet_header = unpack_packet_header(packet_header_bytes)
			
			remaning_bytes = data[PACKET_HEADER_FORMAT_SIZE:]

			match packet_header.packet_id:
				case PacketIDs.CAR_TELEMETRY.value:
					car_telemetry_packet = unpack_car_telemetry(packet_header, remaning_bytes)
					
					multi_function_display.update_from_car_telemetry_packet(car_telemetry_packet)

				case PacketIDs.CAR_STATUS.value:
					car_status_packet = unpack_car_status(packet_header, remaning_bytes)

					multi_function_display.update_from_car_status_packet(car_status_packet)

				case PacketIDs.CAR_DAMAGE.value:
					car_damage_packet = unpack_car_damage(packet_header, remaning_bytes)

					multi_function_display.update_from_car_damage_packet(car_damage_packet)

				case PacketIDs.TYRE_SETS.value:
					tyre_sets_packet = unpack_tyre_sets(packet_header, remaning_bytes)

					multi_function_display.update_from_tyre_sets_packet(tyre_sets_packet)
				
				case PacketIDs.LAP_DATA.value:
					lap_data_packet = unpack_lap_data(packet_header, remaning_bytes)

					multi_function_display.update_from_lap_data_packet(lap_data_packet)

				case PacketIDs.PARTICIPANTS.value:
					participants_packet = unpack_participants(packet_header, remaning_bytes)

					multi_function_display.update_from_participants_packet(participants_packet)

				case PacketIDs.SESSION.value:
					session_packet = unpack_session(packet_header, remaning_bytes)

					multi_function_display.update_from_session_packet(session_packet)

				case PacketIDs.EVENT.value:
					event_packet = unpack_event_packet(packet_header, remaning_bytes)
					event = event_packet.event

					# Button Events
					if type(event) == ButtonsEvent:
						if (event.button_status & ButtonFlags.UDP_ACTION_1):
							multi_function_display.navigate_left()
					
						elif (event.button_status & ButtonFlags.UDP_ACTION_2):
							multi_function_display.navigate_right()

					elif type(event) == SafetyCarEvent:
						multi_function_display.update_from_safety_car_event(event)

					elif type(event) == FastestLapEvent:
						multi_function_display.update_from_fastest_lap_event(event)
			
			print(f"{to_json(multi_function_display.active_panel())}\n\n\n\n\n")

			save_mfd(multi_function_display)

if __name__ == '__main__':
	init_db()
	start_server()