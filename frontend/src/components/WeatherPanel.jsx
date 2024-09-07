// /components/WeatherPanel.jsx
import React from "react";
import './WeatherPanel.css';

const WeatherPanel = ({ data }) => {
	if (!data) return null;

	return (
		<div className="weather-panel">
			<h2 className="weather-title">Weather Conditions</h2>
			<div className="weather-info">
				<div className="weather-item">
					<span>Current Weather:</span> <span>{data.weather}</span>
				</div>
				<div className="weather-item">
					<span>Air Temperature:</span> <span>{data.temperate_air}°C</span>
				</div>
				<div className="weather-item">
					<span>Track Temperature:</span> <span>{data.temperature_track}°C</span>
				</div>
			</div>

			<h3 className="forecast-title">Weather Forecasts</h3>
			<div className="forecast-list">
				{data.weather_forecasts.map((forecast, index) => (
					<div key={index} className="forecast-item">
						<div>
							<span>Time Offset:</span> <span>{forecast.time_offset_in_minutes} minutes</span>
						</div>
						<div>
							<span>Rain Percentage:</span> <span>{forecast.rain_percentage}%</span>
						</div>
						<div>
							<span>Air Temperature:</span> <span>{forecast.temperatur_air}°C</span>
						</div>
						<div>
							<span>Air Temp Change:</span> <span>{forecast.temperatur_air_change}</span>
						</div>
						<div>
							<span>Track Temperature:</span> <span>{forecast.temperatur_track}°C</span>
						</div>
						<div>
							<span>Track Temp Change:</span> <span>{forecast.temperatur_track_change}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default WeatherPanel;
