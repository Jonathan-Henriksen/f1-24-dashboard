import React from "react";
import Card from "./Card";
import { formatTime } from "utils";
import { getTeamColor } from "helpers/colorHelper";

const TimingsCard = ({ lapTimes, playerTeam, pitStatus }) => {
	const fastestLap = lapTimes.fastestLap;
	const personalBest = lapTimes.personalBest;
	const teammateBest = lapTimes.teammateBest;
	const currentLap = lapTimes.currentLap;

	return (
		<Card flex="flex grow items-center basis-1/3 divide-x-2 divide-mainBorder/50 min-w-card-lg max-w-card-lg">
			{/* Fastest Lap*/}
			<div className="flex flex-col p-4 gap-2 w-1/4">
				<span className="text-center text-3xl font-semibold tracking-wide">Fastest Lap</span>
				<span className="text-center text-5xl font-semibold tracking-wide text-lapTime-purple/90">{formatTime(fastestLap.lapTime)}</span>
				<span className={`text-center text-3xl font-semibold tracking-wide ${getTeamColor(fastestLap.teamName)}`}>{formatTime(fastestLap.driverName)}</span>
			</div>

			{/* Personal Best*/}
			<div className="flex flex-col p-4 gap-2 w-1/4">
				<span className="text-center text-3xl font-semibold tracking-wide">Personal Best</span>
				<span className="text-center text-5xl font-semibold tracking-wide text-lapTime-green/90">{formatTime(personalBest.lapTime)}</span>
			</div>

			{/* Teammate Best*/}
			<div className="flex flex-col p-4 gap-2 w-1/4">
				<span className={"text-center text-3xl font-semibold"}>Teammate Best</span>
				<span className={`text-center text-5xl font-semibold tracking-wide ${playerTeam ? getTeamColor(playerTeam) : ''}`}>{formatTime(teammateBest.lapTime)}</span>
			</div>

			{/* Current Lap*/}
			<div className="flex flex-col p-4 gap-2 w-1/4">
				<span className="text-center text-3xl font-semibold tracking-wide">Current Lap</span>
				<span className={`text-center text-5xl font-semibold tracking-wide capitalize ${currentLap.isInvalid ? 'text-mainRed' : ''}`}>
					{pitStatus.toLowerCase() == 'none' ? formatTime(currentLap.lapTime) : pitStatus.toLowerCase().replace("_", " ")}
				</span>
			</div>
		</Card>
	)
}

export default TimingsCard