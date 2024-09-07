import React from 'react';
import CardRow from './CardRow';
import CarDeltasGraphic from './CarDeltasGraphic';
import './TimingsPanel.css';

const TimingsPanel = ({ data }) => {
	const topRowCards = [
		{ title: 'Fastest Lap', data: data.lap_time_fastest_driver.lap_time_personal_best, driverName: data.lap_time_fastest_driver.name, color: 'purple', isFastest: true },
		{ title: 'Personal Best', data: data.lap_time_personal_best, color: 'green' },
		{ title: 'Teammate Best', data: data.lap_time_teammate_best, color: 'green' }
	];

	const bottomRowCards = [
		{ title: 'Current Lap', data: data.lap_time_current, color: 'white', isInvalid: data.lap_time_current_invalidated },
		{ title: 'Previous Lap', data: data.lap_time_previous, color: 'white' }
	];

	return (
		<div className="timings-panel">
			<div className="lap-info">
				<CardRow lapTimeCards={topRowCards} /> {/* Changed from cards to lapTimeCards */}
			</div>
			<div className="lap-info">
				<CardRow lapTimeCards={bottomRowCards} /> {/* Changed from cards to lapTimeCards */}
			</div>
			<div className="car-deltas-row">
				<CarDeltasGraphic
					behindCar={data.driver_behind}
					playerCar={data.player}
					frontCar={data.driver_in_front}
					leaderCar={data.race_leader}
				/>
			</div>
		</div>
	);
};

export default TimingsPanel;
