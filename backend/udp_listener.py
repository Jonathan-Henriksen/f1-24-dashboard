import socket
from services import DriversService as drivers
from services import SessionsService as sessions

from telemetry.enums import PacketIDs
from telemetry.packets import *

_PORT = 9999
_IP = '0.0.0.0'

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((_IP, _PORT))


def run_udp_listener():	
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
				case PacketIDs.TYRE_SETS.value:
					tyre_sets_packet = unpack_tyre_sets(packet_header, remaning_bytes)

					drivers.update_from_tyre_sets_packet(tyre_sets_packet)
				
				case PacketIDs.LAP_DATA.value:
					lap_data_packet = unpack_lap_data(packet_header, remaning_bytes)

					drivers.update_from_lap_data_packet(lap_data_packet)

				case PacketIDs.PARTICIPANTS.value:
					participants_packet = unpack_participants(packet_header, remaning_bytes)

					drivers.update_from_participants_packet(participants_packet)

				case PacketIDs.SESSION.value:
					session_packet = unpack_session(packet_header, remaning_bytes)

					sessions.update_from_session_packet(session_packet)
					drivers.update_from_session_packet(session_packet)

				case PacketIDs.SESSION_HISTORY.value:
					session_history_packet = unpack_session_history(packet_header, remaning_bytes)

					drivers.update_from_session_history_packet(session_history_packet)

				case PacketIDs.EVENT.value:
					event_packet = unpack_event_packet(packet_header, remaning_bytes)
					event = event_packet.event

					if type(event) == ButtonsEvent:
						if (event.button_status & ButtonFlags.UDP_ACTION_1):
							print("UDP_ACTION_1 Pressed")

						elif (event.button_status & ButtonFlags.UDP_ACTION_2):
							print("UDP_ACTION_2 Pressed")

					elif type(event) == FastestLapEvent:
						fastest_lap_driver = drivers.find_one(event_packet.header.session_uid, {'carIndex' : event.vehicle_index})

						print(f"Fastest Lap Time was set by {fastest_lap_driver.name}")

						sessions.update_from_fastest_lap_event(event_packet.header.session_uid, fastest_lap_driver.name, event)
						