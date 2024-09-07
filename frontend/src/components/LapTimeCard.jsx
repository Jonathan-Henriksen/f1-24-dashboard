import React, { useEffect, useState } from 'react';
import { formatTime } from 'helpers/helpers';
import './LapTimeCard.css';

const LapTimeCard = ({ title, time, color, driverName, isInvalid, isFastest }) => {
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		if (isFastest) {
			setAnimate(true);
			const timer = setTimeout(() => setAnimate(false), 1000); // Reset animation after 1 second
			return () => clearTimeout(timer);
		}
	}, [time, isFastest]);

	return (
		<div className={`lap-time-card ${animate ? 'fastest-lap-animation' : ''}`}>
			<h2 className="lap-time-title">{title}</h2>
			<p className={`lap-time-value ${color}`}>{formatTime(time)}</p>
			{isFastest && <p className="fastest-driver">{driverName || 'N/A'}</p>}
			{isInvalid && <p className="invalid-lap text-red-600">Invalid</p>}
		</div>
	);
};

export default LapTimeCard;
