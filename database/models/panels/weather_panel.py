from typing import List
from telemetry.enums import Weather, TemperatureChange
from telemetry.packets import SessionPacket, WeatherForecastSample

class WeatherPanel:
    def __init__(self):
        self.name = "Weather"
        self.temperate_air: int = 0
        self.temperature_track: int = 0
        self.weather: str = Weather.CLEAR.name
        self.weather_forecasts: List[WeatherForecast] = []

    def update_from_session(self, session_packet: SessionPacket):
        self.temperate_air = session_packet.air_temperature
        self.temperature_track = session_packet.track_temperature
        self.weather = Weather(session_packet.weather).name
        
        self.weather_forecasts = [
            WeatherForecast(
                time_offset_in_minutes=forecast_sample.time_offset,
                temperatur_air=forecast_sample.air_temperature,
                temperatur_air_change=TemperatureChange(forecast_sample.air_temperature_change).name,
                temperatur_track=forecast_sample.track_temperature,
                temperatur_track_change=TemperatureChange(forecast_sample.track_temperature_change).name,
                rain_percentage=forecast_sample.rain_percentage
            )
            for forecast_sample in session_packet.weather_forecast_samples[:session_packet.num_weather_forecast_samples]
            if forecast_sample.session_type == session_packet.session_type
        ]

class WeatherForecast:
    def __init__(self, time_offset_in_minutes=0, temperatur_air=0, temperatur_air_change=TemperatureChange.NO_CHANGE.name, 
                 temperatur_track=0, temperatur_track_change=TemperatureChange.NO_CHANGE.name, rain_percentage=0):
        self.time_offset_in_minutes: int = time_offset_in_minutes
        self.temperatur_air: int = temperatur_air
        self.temperatur_air_change: str = temperatur_air_change
        self.temperatur_track: int = temperatur_track
        self.temperatur_track_change: str = temperatur_track_change
        self.rain_percentage: int = rain_percentage
