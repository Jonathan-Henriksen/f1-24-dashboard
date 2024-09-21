import { formatTime } from "helpers/helpers";
import { getTeamColor } from 'helpers/colorHelper'
import React from "react";
import WeatherIcon from "./WeatherIcon";

const TimingsCard = ({ timingsData }) => (
	<div className="flex grow justify-stretch items-center p-4 divide-x-4 border-2 rounded-xl shadow-xl bg-mainDark/50 shadow-mainDark/50 border-mainBorder/25 divide-mainBorder/50">

		{/* Fastest Lap*/}
		<div className="flex grow flex-col justify-center items-center p-2 gap-2">
			<span className="text-center text-2xl font-semibold">Fastest Lap</span>
			<span className="text-center text-4xl font-bold text-lapTime-purple">{formatTime(timingsData.lap_time_fastest_driver.lap_time_personal_best)}</span>
		</div>

		{/* Personal Best*/}
		<div className="flex grow flex-col justify-center items-center p-2 gap-2">
			<span className="text-center text-2xl font-semibold">Personal Best</span>
			<span className="text-center text-4xl font-bold text-lapTime-green">{formatTime(timingsData.lap_time_personal_best)}</span>
		</div>

		{/* Teammate Best*/}
		<div className="flex grow flex-col justify-center items-center p-2 gap-2">
			<span className={"text-center text-2xl font-semibold"}>Teammate Best</span>
			<span className={`text-center text-4xl font-bold ${timingsData.player ? getTeamColor(timingsData.player.team) : ''}`}>{formatTime(timingsData.lap_time_teammate_best)}</span>
		</div>

		{/* Current Lap*/}
		<div className="flex grow flex-col justify-center items-center p-2 gap-2">
			<span className="text-center text-2xl font-semibold">Current Lap</span>
			<span className={`text-center text-4xl font-bold ${timingsData.lap_time_current_invalidated ? 'text-mainRed' : ''}`}>{formatTime(timingsData.lap_time_current)}</span>
		</div>
	</div>
)

const TimeLeftCard = ({ time }) => (
	<div className="flex grow justify-center items-center divide-x-2 border-2 rounded-xl shadow-xl bg-mainDark/50 border-mainBorder/25 shadow-mainDark/50 divide-mainBorder/40">
		<div className="flex grow flex-col p-2 gap-2">
			<span className="text-center text-2xl font-semibold">Time Left</span>
			<span className={`text-center text-4xl font-bold ${time.minutes < 2 ? 'text-mainRed' : ''}`}>{formatTime(time, { excludeMs: true })}</span>
		</div>
	</div>
)

const DeltasCard = ({ timingsData }) => {
	let driverInFront = timingsData.driver_in_front
	let driverBehind = timingsData.driver_behind
	let raceLeader = timingsData.race_leader
	let player = timingsData.player

	return (
		<div className="flex grow flex-col justify-center items-center p-4 divide-y-2 border-2 rounded-xl shadow-xl bg-mainDark/50 border-mainBorder/25 shadow-mainDark/50 divide-mainBorder/50">

			{raceLeader && raceLeader.position != player.position && (
				<div className="flex justify-stretch justify-items-start items-center gap-2">
					<span className="text-4xl font-bold">P{raceLeader.position}</span>
					<span className={`text-4xl br-2 border-mainBorder/25 ${getTeamColor(raceLeader.team)}`}>{raceLeader.name}</span>
					<span className="text-2xl text-mainRed">+{formatTime(raceLeader.delta_to_player)}</span>
				</div>
			)}

			{driverInFront && (
				<div className="flex justify-stretch justify-items-start items-center gap-2">
					<span className="text-4xl font-bold">P{driverInFront.position}</span>
					<span className={`text-4xl br-2 border-mainBorder/25 ${getTeamColor(driverInFront.team)}`}>{driverInFront.name}</span>
					<span className="text-2xl text-mainRed">+{formatTime(driverInFront.delta_to_player)}</span>
				</div>
			)}

			{player && (
				<div className="flex justify-stretch justify-items-start items-center gap-2">
					<span className="text-4xl font-bold">P{player.position}</span>
					<span className="text-4xl br-2 border-mainBorder/25">{player.name}</span>
				</div>
			)}

			{driverBehind && (
				<div className="flex justify-stretch justify-items-start items-center gap-2">
					<span className="text-3xl font-bold">P{driverBehind.position}</span>
					<span className={`text-3xl br-2 border-mainBorder/25 ${getTeamColor(driverBehind.team)}`}>{driverBehind.name}</span>
					<span className="text-3xl text-lapTime-green">-{formatTime(driverBehind.delta_to_player)}</span>
				</div>
			)}
		</div>
	)
}

const SettingsCard = ({ ersDeployMode, brakeBias, differential }) => (
	<div className="flex grow flex-col justify-center items-stretch p-4 divide-y-2 border-2 rounded-xl shadow-xl bg-mainDark/50 border-mainBorder/25 shadow-mainDark/50 divide-mainBorder/50">

		<div className="flex justify-stretch justify-items-start items-center gap-4">
			<span className="text-3xl font-bold">ERS Deploy Mode</span>
			<span className="text-3xl capitalize">{ersDeployMode}</span>
		</div>

		<div className="flex justify-stretch justify-items-start items-center gap-4">
			<span className="text-3xl font-bold">Brake Bias</span>
			<span className="text-3xl">{brakeBias}%</span>
		</div>

		<div className="flex justify-stretch justify-items-start items-center gap-4">
			<span className="text-3xl font-bold">Differential</span>
			<span className="text-3xl">{differential}%</span>
		</div>
	</div>
)

const StrategyCard = ({ recommendedLapToPit, latestLapToPit, expectedRejoinPosition }) => (
	<div className="flex grow flex-col justify-center items-center p-4 divide-y-2 border-2 rounded-xl shadow-xl bg-mainDark/50 border-mainBorder/25 shadow-mainDark/50 divide-mainBorder/50">

		<div className="flex grow flex-col justify-center items-center">
			<span className="text-center text-3xl">Recommended Lap to Pit</span>
			<span className="text-center text-4xl font-bold">Lap{recommendedLapToPit}</span>
		</div>

		<div className="flex grow flex-col justify-center items-center">
			<span className="text-center text-3xl">Latest Lap to Pit</span>
			<span className="text-center text-4xl font-bold">Lap {latestLapToPit}</span>
		</div>

		<div className="flex grow justify-center items-center">
			<span className="text-center text-3xl">Expected Rejoin Position</span>
			<span className="text-center text-4xl font-bold">P{expectedRejoinPosition}</span>
		</div>
	</div>
)

const WeatherCard = ({ weatherData }) => (
	<div className="flex grow justify-center items-center p-4 divide-x-2 border-2 rounded-xl shadow-xl bg-mainDark/50 border-mainBorder/25 shadow-mainDark/50 divide-mainBorder/50">
		<div className="flex flex-col justify-center items-start">
			<WeatherIcon weather={weatherData.weather} />
			<span className="text-4xl border-t-2 border-mainBorder/25">Air {weatherData.temperature_air}°C</span>
			<span className="text-4xl">Track {weatherData.temperature_track}°C</span>
			<span className="text-3xl">Now</span>
		</div>

		{weatherData.weather_forecasts.map((forecast, index) => (
			<div key={index} className="flex flex-col justify-center items-start">
				<WeatherIcon weather={forecast.weather} />
				<span className="text 4xl border-t-2 border-mainBorder/25">Air {forecast.temperature_air}°C</span>
				<span className="text-4xl">Track {forecast.temperature_track}°C</span>
				<span className="text-4xl">Rain {forecast.rain_percentage}%</span>
				<span className="text-3xl">+ {forecast.offset_in_minutes}min</span>
			</div>
		))}
	</div>
)

const FocusPanel = ({ generalData, timingsData, strategyData, tyreData, weatherData }) => {
	let sessionType = generalData.session_type;

	return (
		<div classname="flex grow justify-center items-center gap-8">

			<DeltasCard timingsData={timingsData} />

			<TimingsCard timingsData={timingsData} />

			{(sessionType.includes('PRACTICE') || sessionType.includes('QUALIFYING')) ? (
				<TimeLeftCard time={timingsData.session_time_left} />
			) : (
				<StrategyCard recommendedLapToPit={strategyData.lap_to_pit_recommended} latestLapToPit={strategyData.lap_to_pit_latest} expectedRejoinPosition={strategyData.expected_rejoin_position} />
			)}

			<SettingsCard ersDeployMode={generalData.ers_deploy_mode} brakeBias={generalData.brake_bias} differential={generalData.differential} />

			{/* <WeatherCard weatherData={weatherData} /> */}
		</div >
	)
}

export default FocusPanel