from typing import List
from telemetry.enums import Weather
from telemetry.packets import SessionPacket, WeatherForecastSample

class WeatherPanel:
	def __init__(self):
		self.temperate_air: int = 0
		self.temperature_track: int = 0
		self.weather: str = Weather.CLEAR.name
		self.weather_forecasts: List[WeatherForecastSample] = []

	def update_from_session(self, session_packet: SessionPacket):
		self.temperate_air = session_packet.air_temperature
		self.temperature_track = session_packet.track_temperature
		self.weather = Weather(session_packet.weather).name

		# Directly assign filtered forecasts to weather_forecasts
		self.weather_forecasts = [
			forecast for forecast in session_packet.weather_forecast_samples[:session_packet.num_weather_forecast_samples]
			if forecast.session_type == session_packet.session_type
		]
