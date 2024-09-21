import React from "react";

const WeatherPanel = ({ data }) => {
	return (
		<div className="flex grow flex-col gap-8">

			{/* Current Weather */}
			<div className="flex justify-stretch items-center border-2 rounded-xl shadow-xl p-4 gap-8 divide-x-2 bg-mainDark/50 shadow-mainDark/50 divide-mainBorder/25 ">
				<span className="capitalize">Weather Icon: {data.weather}</span>
				<span>Air Temp: {data.temperature_air}</span>
				<span>Track Temp: {temperature_track}</span>
			</div>

			{/* Weather Forecase*/}
			<div className="flex justify-center items-center border-2 rounded-xl shadow-xl p-4 gap-4 divide-x-2 bg-mainDark/50 shadow-mainDark/50 divide-mainBorder/25 ">
				{data.weather_forecasts.map((forecast, index) => (
					<div key={index} className="flex grow flex-col shadow-inner p-4">
						<span className="capitalize border-b-2 border-mainBorder/25">Weather Icon: {forecast.weather}</span>
						<span>Air Temp: {forecast.temperature_air}</span>
						<span>Track Temp: {forecast.temperature_track}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default WeatherPanel;
