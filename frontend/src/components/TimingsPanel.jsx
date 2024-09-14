import React from 'react';
import CardRow from './CardRow';
import CarDeltasGraphic from './CarDeltasGraphic';
import { getTeamColor } from 'helpers/helpers';

const TimingsPanel = ({ data, sessionType }) => {
	const topRowCards = [
		{ title: 'Fastest Lap', data: data.lap_time_fastest_driver.lap_time_personal_best, driverName: data.lap_time_fastest_driver.name, driverTeam: data.lap_time_fastest_driver ? data.lap_time_fastest_driver.team : '', color: 'purple', isFastest: true },
		{ title: 'Personal Best', data: data.lap_time_personal_best, color: 'green' },
		{ title: 'Teammate Best', data: data.lap_time_teammate_best, color: data.player ? getTeamColor(data.player.team) : 'white' }
	];

	const bottomRowCards = [
		{ title: 'Current Lap', data: data.lap_time_current, color: 'white', isInvalid: data.lap_time_current_invalidated },
		{ title: 'Previous Lap', data: data.lap_time_previous, color: 'white' }
	];

	// Check if the session type contains PRACTICE or QUALIFYING, and replace 'Previous Lap' with 'Time Left' if true
	if (sessionType && (sessionType.includes('PRACTICE') || sessionType.includes('QUALIFYING'))) {
		const timeLeftCard = {
			title: 'Time Left',
			data: data.session_time_left,
			color: data.session_time_left.minutes < 2 ? 'red' : 'white',
			excludeMs: true
		};

		bottomRowCards[1] = timeLeftCard; // Replace the 'Previous Lap' card with the 'Time Left' card
	}

	return (
		<div className="flex flex-col justify-center items-center rounded-lg border-2 w-full h-full p-12">
			<div className="w-full mb-12">
				<CardRow lapTimeCards={topRowCards} /> {/* Changed from cards to lapTimeCards */}
			</div>
			<div className="w-full mb-12">
				<CardRow lapTimeCards={bottomRowCards} /> {/* Changed from cards to lapTimeCards */}
			</div>
			<div className="flex justify-center items-center w-full h-auto mt-4">
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
