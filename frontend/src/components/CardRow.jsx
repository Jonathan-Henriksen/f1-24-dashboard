import React from 'react';
import LapTimeCard from './LapTimeCard';
import './CardRow.css';

const CardRow = ({ lapTimeCards = [] }) => {
	return (
		<div className="card-row">
			{lapTimeCards.map((card, index) => (
				<div key={index} className="card-container">
					<LapTimeCard
						title={card.title}
						time={card.data}
						color={card.color}
						driverName={card.driverName}
						driverTeam={card.driverTeam}
						isInvalid={card.isInvalid}
						isFastest={card.isFastest}
					/>
				</div>
			))}
		</div>
	);
};

export default CardRow;
