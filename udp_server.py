import socket
import helpers.database_helper as db_helper

from enums import PacketIDs
from packets import *
from panels.tyre_info import TyreInfoPanel

_PORT = 9999
_IP = '0.0.0.0'

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((_IP, _PORT))

# MDF Panels
panel_tyre_info = TyreInfoPanel()

def start_server():
    print(f"Listening for UDP packets on port {_PORT}...")
    while True:
        data, _ = sock.recvfrom(2048)
        handle_packet(data)

def handle_packet(data: bytes):
    if len(data) >= PACKET_HEADER_FORMAT_SIZE:
            packet_header = PacketHeader(data)

            match packet_header.packet_id:
                case PacketIDs.CAR_TELEMETRY.value:
                    car_telemetry_packet = unpack_car_telemetry(packet_header, data[PACKET_HEADER_FORMAT_SIZE:])

                    panel_tyre_info.update_from_car_telemetry_packet(car_telemetry_packet.player_data())

                    db_helper.save_tyres_to_db(panel_tyre_info)

                case PacketIDs.CAR_STATUS.value:
                    car_status_packet = unpack_car_status(packet_header, data)

                    panel_tyre_info.update_from_car_status_packet(car_status_packet.player_data())

                    db_helper.save_tyres_to_db(panel_tyre_info)

                case PacketIDs.CAR_DAMAGE.value:
                    car_damage_packet = unpack_car_damage(packet_header, data)
                    panel_tyre_info.update_from_car_damage_packet(car_damage_packet.player_data())

                    db_helper.save_tyres_to_db(panel_tyre_info)

                case PacketIDs.TYRE_SETS.value:
                    tyre_sets_packet = unpack_tyre_sets(packet_header, data)
                    panel_tyre_info.update_from_tyre_sets_packet(tyre_sets_packet)

                    db_helper.save_tyres_to_db(panel_tyre_info)

                case _:
                    print(f"Packet of type {PacketIDs(packet_header.packet_id)} was received but not implemented")

if __name__ == '__main__':
    db_helper.init_db()
    start_server()

