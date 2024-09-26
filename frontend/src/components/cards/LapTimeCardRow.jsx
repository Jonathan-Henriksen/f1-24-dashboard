import React from 'react';
import LapTimeCard from './LapTimeCard';

const WeatherCard = ({ weatherData }) => (
	<Card flex="flex items-center divide-x-2 divide-mainBorder/50">
		{weatherData.weather_forecasts.map((forecast, index) =>
			forecast.time_offset_in_minutes !== 0 && (
				<WeatherCardRow forecast={forecast} />
			))}
	</Card >
)

const CardRow = ({ lapTimeCards = [] }) => {
	return (
		<div className="flex justify-center w-full px-4 py-8 gap-32">
			{lapTimeCards.map((card, index) => (
				<LapTimeCard
					index={index}
					title={card.title}
					time={card.data}
					color={card.color}
					driverName={card.driverName}
					driverTeam={card.driverTeam}
					isInvalid={card.isInvalid}
					isFastest={card.isFastest}
					excludeMs={card.excludeMs}
				/>
			))}
		</div>
	);
};

export default CardRow;
