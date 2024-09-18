import React, { useEffect, useState } from 'react';
import { formatTime, capitalizeName, getTeamColor } from 'helpers/helpers';

const LapTimeCard = ({ index, title, time, color, driverName, driverTeam, isInvalid, isFastest, excludeMs }) => {
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		if (isFastest) {
			setAnimate(true);
			const timer = setTimeout(() => setAnimate(false), 1000);
			return () => clearTimeout(timer);
		}
	}, [time, isFastest]);

	return (
		<div key={index} className={`flex flex-col justify-center min-h-48 min-w-48 max-w-72 w-full px-8 py-4 bg-mainDark/50 border-mainBorder/25 shadow-mainDark/75`}>
			<h2 className="text-center text-3xl capitalize tracking-wide pb-1">{title}</h2>
			<p className={`text-center text-6xl font-semibold tracking-wide text-lapTime-${color}`}>{formatTime(time, { excludeMs: excludeMs })}</p>
			{isFastest && driverName && driverTeam && (
				<p className={`text-center text-2xl -mb-8 ${driverTeam ? getTeamColor(driverTeam) : ''}`}>
					{capitalizeName(driverName)}
				</p>
			)}
			{isInvalid && <p className="text-center text-xl text-mainRed -mb-7">Invalid</p>}
		</div>
	);
};

export default LapTimeCard;
