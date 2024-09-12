// CarDeltasGraphic.jsx
import React from 'react';
import { formatTime, getCarImage, getTeamColor, capitalizeName } from 'helpers/helpers';
import './CarDeltasGraphic.css';

const CarDeltasGraphic = ({ behindCar, playerCar, frontCar, leaderCar }) => {
	const carsToRender = [];
	if (leaderCar) carsToRender.push({ type: 'leader', ...leaderCar });
	if (frontCar) carsToRender.push({ type: 'front', ...frontCar });
	carsToRender.push({ type: 'player', ...playerCar });
	if (behindCar) carsToRender.push({ type: 'behind', ...behindCar });

	return (
		<div className="car-deltas-container">
			{carsToRender.map((car, index) => (
				<React.Fragment key={car.name}>
					<div className="car-container">
						<div className="driver-info">
							<div className="driver-position">P{car.position}</div>
							<div className={`driver-name ${getTeamColor(car.team)}`}>{car.type === 'player' ? 'You' : capitalizeName(car.name)}</div>
						</div>
						<img src={getCarImage(car.team)} alt={car.name} className="car-image" />
					</div>

					{index < carsToRender.length - 1 && (
						<span className={`delta-time ${car.type === 'behind' ? 'delta-time-behind' : 'delta-time-ahead'}`}>
							{car.delta_to_player ? formatTime(car.delta_to_player) : null}
						</span>
					)}
				</React.Fragment>
			))}
		</div>
	);
};

export default CarDeltasGraphic;
