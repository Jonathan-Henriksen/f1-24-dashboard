import React from 'react';
import LapTimeCard from './LapTimeCard';

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
