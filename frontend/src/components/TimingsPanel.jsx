import React from 'react';
import CardRow from './CardRow';
import CarDeltasGraphic from './CarDeltasGraphic';
import { getTeamColor } from 'helpers/helpers';
import './TimingsPanel.css';

const TimingsPanel = ({ data, sessionType }) => {
	const fastestLapCard = { title: 'Fastest Lap', data: data.lap_time_fastest_driver.lap_time_personal_best, driverName: data.lap_time_fastest_driver.name, driverTeam: data.lap_time_fastest_driver.team, color: 'purple', isFastest: true }

	const topRowCards = [fastestLapCard];
	if (player) {
		const personalBestCard = { title: 'Personal Best', data: data.lap_time_personal_best, color: 'green' }
		const teammateBestCard = { title: 'Teammate Best', data: data.lap_time_teammate_best, color: getTeamColor(data.player.team) }

		topRowCards.push(personalBestCard)
		topRowCards.push(teammateBestCard)
	}

	// Bottom Row
	const bottomRowCards = []

	if (data.lap_time_current) {
		const currentLapTimeCard = { title: 'Current Lap', data: data.lap_time_current, color: 'white', isInvalid: data.lap_time_current_invalidated }
		bottomRowCards.push(currentLapTimeCard)
	}

	if (data.lap_time_previous) {
		const previousLapCard = { title: 'Previous Lap', data: data.lap_time_previous, color: 'white' }

		bottomRowCards.push(previousLapCard)
	}

	if (sessionType && (sessionType.includes('PRACTICE') || sessionType.includes('QUALIFYING'))) {
		const timeLeftCard = { title: 'Time Left', data: data.session_time_left, color: data.session_time_left.minutes < 2 ? 'red' : 'white' };

		bottomRowCards.push(timeLeftCard)
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
