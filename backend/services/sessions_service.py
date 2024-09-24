from database.clients import SessionsClient as sessions
from telemetry.packets import SessionPacket, FastestLapEvent
from telemetry.enums import  GameModes, SessionLength, SessionTypes, Tracks, Weather

class SessionsService:

	@staticmethod
	def update_from_session_packet(packet: SessionPacket):
		sessions.update_or_insert(packet.header.session_uid, {
				'pitSpeedLimit' : packet.pit_speed_limit,
				'track' : Tracks(packet.track_id).name,
				'length' : SessionLength(packet.session_length).name,
				'totalLaps' : packet.total_laps,
				'timeLeft' : packet.session_time_left,
				'timeOfDay' : packet.time_of_day,
				'gameMode' : GameModes(packet.game_mode).name,
				'sessionType': SessionTypes(packet.session_type).name,
				'playerCarIndex': packet.header.player_car_index,
				'weather' : {
					'name' : Weather(packet.weather).name,
					'temperature' : {
						'air' : packet.air_temperature,
						'track' :packet.track_temperature
					},
					'forecasts' : []
				}
			})

	@staticmethod
	def update_from_fastest_lap_event(session_id: int, event: FastestLapEvent):
		sessions.update_or_insert(session_id, {
			'fastestLapInMs' : int(abs(event.lap_time * 1000)),
			'fastestLapCarIndex' : event.vehicle_index
		})