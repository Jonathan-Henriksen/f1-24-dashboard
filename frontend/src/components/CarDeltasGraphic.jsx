import React from 'react';
import { formatTime, getCarImage } from 'helpers/helpers';
import './CarDeltasGraphic.css';

const CarDeltasGraphic = ({ behindCar, playerCar, frontCar, leaderCar }) => {
	// Determine the cars to render
	const carsToRender = [];
	if (leaderCar) carsToRender.push({ type: 'leader', ...leaderCar });
	if (frontCar) carsToRender.push({ type: 'front', ...frontCar });
	carsToRender.push({ type: 'player', ...playerCar });
	if (behindCar) carsToRender.push({ type: 'behind', ...behindCar });

	return (
		<div className="flex justify-center items-center space-x-4">
			{carsToRender.map((car, index) => (
				<React.Fragment key={car.name}>
					{/* Car Image and Name */}
					<div className="car-container">
						<img src={getCarImage(car.team)} alt={car.name} className="car-image" />
						{car.type === 'player' ? (
							<span className="driver-name">You</span>
						) : (
							<span className="driver-name">
								{car.position}. {car.name}
							</span>
						)}
					</div>

					{/* Delta Time */}
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
