import React, { useEffect, useState } from 'react';
import { formatTime, capitalizeName, getTeamColor } from 'helpers/helpers';
import './LapTimeCard.css';

const LapTimeCard = ({ title, time, color, driverName, driverTeam, isInvalid, isFastest }) => {
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		if (isFastest) {
			setAnimate(true);
			const timer = setTimeout(() => setAnimate(false), 1000);
			return () => clearTimeout(timer);
		}
	}, [time, isFastest]);

	return (
		<div className={`lap-time-card ${animate ? 'fastest-lap-animation' : ''}`}>
			<h2 className="lap-time-title">{title}</h2>
			<p className={`lap-time-value ${color}`}>{formatTime(time)}</p>
			{isFastest && (
				<p className={`fastest-driver ${driverTeam ? getTeamColor(driverTeam) : ''}`}>
					{driverName ? capitalizeName(driverName) : 'N/A'}
				</p>
			)}
			{isInvalid && <p className="invalid-lap text-red-600">Invalid</p>}
		</div>
	);
};

export default LapTimeCard;
