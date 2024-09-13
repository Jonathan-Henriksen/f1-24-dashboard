import React from 'react';
import CardRow from './CardRow';
import CarDeltasGraphic from './CarDeltasGraphic';
import { getTeamColor } from 'helpers/helpers';
import './TimingsPanel.css';

const TimingsPanel = ({ data, sessionType }) => {
	const topRowCards = [
		{ title: 'Fastest Lap', data: data.lap_time_fastest_driver.lap_time_personal_best, driverName: data.lap_time_fastest_driver.name, driverTeam: data.lap_time_fastest_driver.team, color: 'purple', isFastest: true },
		{ title: 'Personal Best', data: data.lap_time_personal_best, color: 'green' },
		{ title: 'Teammate Best', data: data.lap_time_teammate_best, color: getTeamColor(data.player.team) }
	];

	const bottomRowCards = [
		{ title: 'Current Lap', data: data.lap_time_current, color: 'white', isInvalid: data.lap_time_current_invalidated },
		{ title: 'Previous Lap', data: data.lap_time_previous, color: 'white' }
	];

	// Check if the session type contains PRACTICE or QUALIFYING, and replace 'Previous Lap' with 'Time Left' if true
	if (sessionType.includes('PRACTICE') || sessionType.includes('QUALIFYING')) {
		const timeLeftCard = {
			title: 'Time Left',
			data: data.session_time_left,
			color: data.session_time_left.minutes < 2 ? 'red' : 'white'
		};

		bottomRowCards[1] = timeLeftCard; // Replace the 'Previous Lap' card with the 'Time Left' card
	}

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
