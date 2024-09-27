import React from "react";

import Card from "./Card";

import { ReactComponent as Clear } from "icons/weather/clear_day.svg";
import { ReactComponent as LightCloud } from "icons/weather/light_cloud_day.svg";
import { ReactComponent as Overcast } from "icons/weather/overcast_day.svg";
import { ReactComponent as LightRain } from "icons/weather/light_rain_day.svg";
import { ReactComponent as HeavyRain } from "icons/weather/heavy_rain_day.svg";

import { ReactComponent as ClearNight } from "icons/weather/clear_night.svg";
import { ReactComponent as LightCloudNight } from "icons/weather/light_cloud_night.svg";
import { ReactComponent as OvercastNight } from "icons/weather/overcast_night.svg";
import { ReactComponent as LightRainNight } from "icons/weather/light_rain_night.svg";
import { ReactComponent as HeavyRainNight } from "icons/weather/heavy_rain_night.svg";

const WeatherCard = ({ weatherData }) => (
	<Card flex="flex items-center divide-x-2 divide-mainBorder/50">
		{weatherData.forecasts.map((forecast, index) =>
			forecast.time_offset_in_minutes !== 0 && (
				<WeatherCardRow forecast={forecast} />
			))}
	</Card >
)

const WeatherIcon = ({ weather, isDay = true }) => {
	switch (weather.toLowerCase()) {
		case "clear":
			return isDay ? <Clear /> : <ClearNight />;
		case "light_cloud":
			return isDay ? <LightCloud /> : <LightCloudNight />;
		case "overcast":
			return isDay ? <Overcast /> : <OvercastNight />;
		case "light_rain":
			return isDay ? <LightRain /> : <LightRainNight />;
		case "heavy_rain":
			return isDay ? <HeavyRain /> : <HeavyRainNight />;
		default:
			return isDay ? <Clear /> : <ClearNight />;
	}
}


const WeatherCardRow = ({ forecast }) => (
	<div key={`forecast-${forecast.time_offset_in_minutes}`} className="flex flex-col px-4 py-2 gap-4">

		<WeatherIcon weather={forecast.weather} />

		<span className="flex self-center text-center text-xl font-semibold text-mainWhite/80">{forecast.time_offset_in_minutes} min</span>

		<div className="flex gap-2">
			<span className="text-3xl font-semibold">Air</span>
			<span className="text-3xl">{forecast.temperatur_air}°C</span>
		</div>

		<div className="flex gap-2">
			<span className="text-3xl font-semibold">Track</span>
			<span className="text-3xl">{forecast.temperatur_track}°C</span>
		</div>

		<div className="flex gap-2">
			<span className="text-3xl font-semibold">Rain</span>
			<span className="text-3xl">{forecast.rain_percentage}%</span>
		</div>

	</div>
)

export default WeatherCard