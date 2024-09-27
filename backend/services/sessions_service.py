from database import SessionsClient as sessions
from telemetry.packets import SessionPacket, FastestLapEvent
from telemetry.enums import  GameModes, SessionLength, SessionTypes, Tracks, Weather, TemperatureChange
from pymongo import DESCENDING

class SessionsService:
	current_session_initialized = False

	@staticmethod
	def find_latest_session():
		return sessions.find({}, [("createdAt", DESCENDING)])
	
	def find_by_session_id(session_id: str):
		return sessions.find({'sessionId' : session_id})
	
	@staticmethod
	def update_from_session_packet(packet: SessionPacket):
		
		forecasts = []
		for forecast in packet.weather_forecast_samples:
			
			if forecast.session_type != packet.session_type: continue

			forecasts.append({
				'name' : Weather(forecast.weather).name,
				'timeOffset' : forecast.time_offset,
				'rainPercentage' : forecast.rain_percentage,
				'temperature' : {
					'air' : forecast.air_temperature,
					'airChange' : TemperatureChange(forecast.air_temperature_change).name,
					'track' : forecast.track_temperature,
					'trackChange' : TemperatureChange(forecast.track_temperature_change).name,
				}
			})
		
		sessions.update_or_insert(packet.header.session_uid, {
				'pitSpeedLimit' : packet.pit_speed_limit,
				'track' : Tracks(packet.track_id).name,
				'trackLength' : packet.track_length,
				'totalLaps' : packet.total_laps,
				'timeLeft' : packet.session_time_left,
				'timeOfDay' : packet.time_of_day,
				'gameMode' : GameModes(packet.game_mode).name,
				'sessionLength' : SessionLength(packet.session_length).name,
				'sessionType': SessionTypes(packet.session_type).name,
				'playerCarIndex': packet.header.player_car_index,
				'weather' : {
					'current' : {
						'name' : Weather(packet.weather).name,
						'temperature' : {
							'air' : packet.air_temperature,
							'track' :packet.track_temperature
						}
					},
					'forecasts' : forecasts
				}
			})

	@staticmethod
	def update_from_fastest_lap_event(session_id: int, event: FastestLapEvent, driver_name: str, driver_team: str):
		sessions.update_or_insert(session_id, {
			'fastestLap': {
				'driverName': driver_name,
				'driverTeam' : driver_team,
				'lapTime' : int(abs(event.lap_time * 1000))
			}
		})