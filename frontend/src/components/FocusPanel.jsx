import { formatTime } from "helpers/helpers";
import { getTeamColor } from 'helpers/colorHelper'
import CarDeltasGraphic from './CarDeltasGraphic';
import WeatherIcon from "./WeatherIcon";
import React from "react";

const TimingsCard = ({ timingsData }) => (
	<div className="flex grow justify-stretch items-center p-4 divide-x-2 gap-2 border-2 rounded-xl shadow-xl bg-mainDark/50 shadow-mainDark/50 border-mainBorder/25 divide-mainBorder/50">

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
		<div className="flex flex-col justify-center items-start p-6 gap-4 divide-y-2 border-2 rounded-xl shadow-xl bg-mainDark/50 border-mainBorder/25 shadow-mainDark/50 divide-mainBorder/50">

			{raceLeader && raceLeader.position != player.position && (
				<div className="flex justify-center justify-items-start items-center gap-2">
					<span className="text-4xl font-bold">P{raceLeader.position}</span>
					<span className={`text-4xl br-2 border-mainBorder/25 ${getTeamColor(raceLeader.team)}`}>{raceLeader.name}</span>
					<span className="text-2xl text-mainRed">+{formatTime(raceLeader.delta_to_player)}</span>
				</div>
			)}

			{driverInFront && (
				<div className="flex justify-center justify-items-start items-center gap-2 pt-4">
					<span className="text-4xl font-bold">P{driverInFront.position}</span>
					<span className={`text-4xl br-2 border-mainBorder/25 ${getTeamColor(driverInFront.team)}`}>{driverInFront.name}</span>
					<span className="text-2xl text-mainRed">+{formatTime(driverInFront.delta_to_player)}</span>
				</div>
			)}

			{player && (
				<div className="flex justify-center justify-items-start items-center gap-2 pt-4">
					<span className="text-4xl font-bold">P{player.position}</span>
					<span className={`text-4xl br-2 border-mainBorder/25 ${getTeamColor(player.team)}`}>{player.name}</span>
				</div>
			)}

			{driverBehind && (
				<div className="flex justify-center justify-items-start items-center gap-2 pt-4">
					<span className="text-3xl font-bold">P{driverBehind.position}</span>
					<span className={`text-3xl br-2 border-mainBorder/25 ${getTeamColor(driverBehind.team)}`}>{driverBehind.name}</span>
					<span className="text-3xl text-lapTime-green">-{formatTime(driverBehind.delta_to_player)}</span>
				</div>
			)}
		</div>
	)
}

const SettingsCard = ({ ersDeployMode, brakeBias, differential }) => (
	<div className="flex flex-col justify-center items-stretch p-4 divide-y-2 border-2 rounded-xl shadow-xl bg-mainDark/50 border-mainBorder/25 shadow-mainDark/50 divide-mainBorder/50">

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
	<div className="flex flex-col justify-center items-center p-4 divide-y-2 border-2 rounded-xl shadow-xl bg-mainDark/50 border-mainBorder/25 shadow-mainDark/50 divide-mainBorder/50">

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
	<div className="flex justify-center items-center p-4 divide-x-2 border-2 rounded-xl shadow-xl bg-mainDark/50 border-mainBorder/25 shadow-mainDark/50 divide-mainBorder/50">

		{/* Now */}
		<div className="flex grow flex-col justify-center items-start p-4 gap-4">

			<WeatherIcon weather={weatherData.weather} />

			<div className="flex grow justify-stretch justify-items-start items-center">
				<span className="text-3xl">Air</span>
				<span className="text-3xl">{weatherData.temperature_air}°C</span>
			</div>

			<div className="flex grow justify-stretch justify-items-start items-center">
				<span className="text-3xl">Track</span>
				<span className="text-3xl">{weatherData.temperature_track}°C</span>
			</div>

			<span className="text-2xl ">Now</span>

		</div>

		{/* Forecasts */}
		{weatherData.weather_forecasts.map((forecast, index) => (
			<div key={index} className="flex grow flex-col justify-center items-start p-4 gap-4">

				<WeatherIcon weather={forecast.weather} />

				<div className="flex grow justify-stretch justify-items-start items-center gap-2">
					<span className="text-3xl font-semibold">Air</span>
					<span className="text-3xl">{forecast.temperature_air}°C</span>
				</div>

				<div className="flex grow justify-stretch justify-items-start items-center gap-2">
					<span className="text-3xl font-semibold">Track</span>
					<span className="text-3xl">{forecast.temperature_track}°C</span>
				</div>

				<div className="flex grow justify-stretch justify-items-start items-center gap-2">
					<span className="text-3xl font-semibold">Rain</span>
					<span className="text-3xl">{forecast.rain_percentage}%</span>
				</div>

				<span className="justify-self-stretch text-center text-2xl font-bold">+{forecast.time_offset_in_minutes} min</span>

			</div>
		))}


	</div>
)

const FocusPanel = ({ generalData, timingsData, strategyData, tyreData, weatherData }) => {
	let sessionType = generalData.session_type;

	return (
		<div classname="flex grow flex-col justify-center content-center items-center gap-8 border-2 shadow-inner rounded-xl bg-mainLight/50 border-mainBorder/25">

			{/* First Row */}
			<div className="flex grow justify-stretch content-center items-stretch gap-8 p-4">
				<SettingsCard ersDeployMode={generalData.ers_deploy_mode} brakeBias={generalData.brake_bias} differential={generalData.differential} />

				<TimingsCard timingsData={timingsData} />

				{(sessionType.includes('PRACTICE') || sessionType.includes('QUALIFYING')) ? (
					<TimeLeftCard time={timingsData.session_time_left} />

				) : (
					<StrategyCard recommendedLapToPit={strategyData.lap_to_pit_recommended} latestLapToPit={strategyData.lap_to_pit_latest} expectedRejoinPosition={strategyData.expected_rejoin_position} />
				)}

			</div>

			{/* Second Row */}
			<div className="flex grow justify-center content-center items-stretch gap-8 p-4">
				<WeatherCard weatherData={weatherData} />
				<DeltasCard timingsData={timingsData} />
			</div>

			{/* Third Row */}
			<div className="flex grow justify-center content-center items-stretch gap-8 p-4">
				<CarDeltasGraphic
					behindCar={timingsData.driver_behind}
					playerCar={timingsData.player}
					frontCar={timingsData.driver_in_front}
					leaderCar={timingsData.race_leader}
				/>
			</div>
		</div >
	)
}

export default FocusPanel