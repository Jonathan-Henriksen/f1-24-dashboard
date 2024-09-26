import React from "react";
import Card from "./Card";

const DeltasCard = ({ timingsData }) => {
	let driverInFront = timingsData.driver_in_front
	let driverBehind = timingsData.driver_behind
	let raceLeader = timingsData.race_leader
	let player = timingsData.player

	return (
		<Card flex="flex-col justify-center items-start divide-y-2 divide-mainBorder/50">
			{raceLeader && raceLeader.position != player.position && (
				<div className="flex justify-center justify-items-start items-center gap-2">
					<span className="text-4xl font-semibold">P{raceLeader.position}.</span>
					<span className={`text-4xl capitalize br-2 border-mainBorder/25 ${getTeamColor(raceLeader.team)}`}>{raceLeader.name.toLowerCase()}</span>
					<span className="text-3xl text-mainRed">+{formatTime(raceLeader.delta_to_player)}</span>
				</div>
			)}

			{driverInFront && (
				<div className="flex justify-center justify-items-start items-center gap-2">
					<span className="text-4xl font-semibold">P{driverInFront.position}.</span>
					<span className={`text-4xl capitalize br-2 border-mainBorder/25 ${getTeamColor(driverInFront.team)}`}>{driverInFront.name.toLowerCase()}</span>
					<span className="text-3xl text-mainRed">+{formatTime(driverInFront.delta_to_player)}</span>
				</div>
			)}

			{player && (
				<div className="flex justify-center justify-items-start items-center gap-2">
					<span className="text-4xl font-semibold">P{player.position}.</span>
					<span className={`text-4xl capitalize br-2 border-mainBorder/25 ${getTeamColor(player.team)}`}>{player.name.toLowerCase()}</span>
				</div>
			)}

			{driverBehind && (
				<div className="flex justify-center justify-items-start items-center gap-2">
					<span className="text-4xl font-semibold">P{driverBehind.position}.</span>
					<span className={`text-4xl capitalize br-2 border-mainBorder/25 ${getTeamColor(driverBehind.team)}`}>{driverBehind.name.toLowerCase()}</span>
					<span className="text-3xl text-lapTime-green">-{formatTime(driverBehind.delta_to_player)}</span>
				</div>
			)}
		</Card>
	)
}

export default DeltasCard