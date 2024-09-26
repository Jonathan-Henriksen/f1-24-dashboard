import React from "react";
import Card from "./Card";

const TimingsCard = ({ timingsData, pitStatus }) => (
	<Card flex="flex grow items-center divide-x-2 divide-mainBorder/50 min-w-card-lg max-w-card-lg">
		{/* Fastest Lap*/}
		<div className="flex flex-col p-4 gap-2 w-1/4">
			<span className="text-center text-3xl font-semibold tracking-wide">Fastest Lap</span>
			<span className="text-center text-5xl font-semibold tracking-wide text-lapTime-purple/90">{formatTime(timingsData.lap_time_fastest_driver.lap_time_personal_best)}</span>
		</div>

		{/* Personal Best*/}
		<div className="flex flex-col p-4 gap-2 w-1/4">
			<span className="text-center text-3xl font-semibold tracking-wide">Personal Best</span>
			<span className="text-center text-5xl font-semibold tracking-wide text-lapTime-green/90">{formatTime(timingsData.lap_time_personal_best)}</span>
		</div>

		{/* Teammate Best*/}
		<div className="flex flex-col p-4 gap-2 w-1/4">
			<span className={"text-center text-3xl font-semibold"}>Teammate Best</span>
			<span className={`text-center text-5xl font-semibold tracking-wide ${timingsData.player ? getTeamColor(timingsData.player.team) : ''}`}>{formatTime(timingsData.lap_time_teammate_best)}</span>
		</div>

		{/* Current Lap*/}
		<div className="flex flex-col p-4 gap-2 w-1/4">
			<span className="text-center text-3xl font-semibold tracking-wide">Current Lap</span>
			<span className={`text-center text-5xl font-semibold tracking-wide capitalize ${timingsData.lap_time_current_invalid ? 'text-mainRed' : ''}`}>
				{pitStatus.toLowerCase() == 'none' ? formatTime(timingsData.lap_time_current) : pitStatus.toLowerCase().replace("_", " ")}
			</span>
		</div>
	</Card>
)

export default TimingsCard