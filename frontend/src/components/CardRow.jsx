import React from 'react';
import LapTimeCard from './LapTimeCard';

const CardRow = ({ lapTimeCards = [] }) => {
	return (
		<div className="card-row">
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
