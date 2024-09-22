import { calculatePercentage, formatTime } from "utils";
import { getColorFromList, getTeamColor } from 'helpers/colorHelper'
import { getTyreCompoundImage } from "helpers/imageHelper";
import CarDeltasGraphic from './CarDeltasGraphic';
import { LinearProgressBar } from "react-percentage-bar";
import WeatherIcon from "./WeatherIcon";
import React from "react";


const TimingsCard = ({ timingsData }) => (
	<Card flex="flex grow items-stretch divide-x-2 divide-mainBorder/50">
		{/* Fastest Lap*/}
		<div className="flex grow flex-col justify-center items-center p-4 gap-2">
			<span className="text-center text-4xl tracking-wide">Fastest Lap</span>
			<span className="text-center text-5xl font-semibold tracking-wide text-lapTime-purple/90">{formatTime(timingsData.lap_time_fastest_driver.lap_time_personal_best)}</span>
		</div>

		{/* Personal Best*/}
		<div className="flex grow flex-col justify-center items-center p-4 gap-2">
			<span className="text-center text-4xl tracking-wide">Personal Best</span>
			<span className="text-center text-5xl font-semibold tracking-wide text-lapTime-green/90">{formatTime(timingsData.lap_time_personal_best)}</span>
		</div>

		{/* Teammate Best*/}
		<div className="flex grow flex-col justify-center items-center p-4 gap-2">
			<span className={"text-center text-4xl"}>Teammate Best</span>
			<span className={`text-center text-5xl font-semibold tracking-wide ${timingsData.player ? getTeamColor(timingsData.player.team) : ''}`}>{formatTime(timingsData.lap_time_teammate_best)}</span>
		</div>

		{/* Current Lap*/}
		<div className="flex grow flex-col justify-center items-center p-4 gap-2">
			<span className="text-center text-4xl">Current Lap</span>
			<span className={`text-center text-5xl font-semibold tracking-wide ${timingsData.lap_time_current_invalidated ? 'text-mainRed' : ''}`}>{formatTime(timingsData.lap_time_current)}</span>
		</div>
	</Card>
)

const TimeLeftCard = ({ time }) => (
	<Card flex="flex grow flex-col justify-center items-center min-w-72 max-w-96">
		<span className="text-center text-4xl tracking-wide">Time Left</span>
		<span className={`text-center text-5xl font-semibold tracking-wide ${time.minutes < 2 ? 'text-mainRed' : ''}`}>{formatTime(time, { excludeMs: true })}</span>
	</Card>
)

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

const SettingsCard = ({ ersDeployMode, brakeBias, differential }) => (
	<Card flex="flex grow justify-center items-stretch">

		<div className="flex flex-col justify-center justify-items-stretch items-start p-2 gap-2 min-w-72 max-w-96 h-full">
			<span className="text-3xl font-semibold tracking-wide">ERS Mode</span>
			<span className="text-3xl font-semibold tracking-wide">Brake Bias</span>
			<span className="text-3xl font-semibold tracking-wide">Differential</span>
		</div>

		<div className="flex flex-col justify-center justify-items-stretch items-start p-2 gap-2">
			<span className="text-3xl tracking-wide capitalize">{ersDeployMode.toLowerCase()}</span>
			<span className="text-3xl tracking-wide">{brakeBias}%</span>
			<span className="text-3xl tracking-wide">{differential}%</span>
		</div>

	</Card>
)

const StrategyCard = ({ recommendedLapToPit, latestLapToPit, expectedRejoinPosition }) => (
	<Card flex="flex-col justify-center items-center divide-y-2 divide-mainBorder/50">

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

	</Card>
)

const WeatherCardRow = ({ forecast }) => (
	<div key={`forecast-${forecast.time_offset_in_minutes}`} className="flex grow flex-col justify-center items-start px-4 py-2 gap-4">

		<WeatherIcon weather={forecast.weather} />

		<span className="flex self-center text-center text-xl font-semibold text-mainWhite/80">{forecast.time_offset_in_minutes} min</span>

		<div className="flex grow justify-stretch justify-items-start items-center gap-2">
			<span className="text-3xl font-semibold">Air</span>
			<span className="text-3xl">{forecast.temperatur_air}°C</span>
		</div>

		<div className="flex grow justify-stretch justify-items-start items-center gap-2">
			<span className="text-3xl font-semibold">Track</span>
			<span className="text-3xl">{forecast.temperatur_track}°C</span>
		</div>

		<div className="flex grow justify-stretch justify-items-start items-center gap-2">
			<span className="text-3xl font-semibold">Rain</span>
			<span className="text-3xl">{forecast.rain_percentage}%</span>
		</div>

	</div>
)

const WeatherCard = ({ weatherData }) => (
	<Card flex="flex justify-center items-center divide-x-2 divide-mainBorder/50">
		{weatherData.weather_forecasts.map((forecast, index) =>
			forecast.time_offset_in_minutes !== 0 && (
				<WeatherCardRow forecast={forecast} />
			))}
	</Card >
)

const TyreAgeRange = [
	{ color: '#2BDD1A', value: 0 },  // Green
	{ color: '#FBCD4C', value: 50 },  // Yellow
	{ color: '#EC3B26', value: 100 }  // Red
];

const TyreWearRange = [
	{ color: '#2BDD1A', value: 0 },  // Green
	{ color: '#FBCD4C', value: 20 },  // Yellow
	{ color: '#EC3B26', value: 40 },  // Red
	{ color: '#EC3B26', value: 100 }  // Red
];


const TyreLifeCard = ({ tyreData }) => {
	let tyreAge = tyreData.tyre_set_laps_age;
	let tyreAgeMax = tyreData.tyre_set_laps_max;
	let tyreLapsRemaing = tyreData.tyre_set_laps_remaining;

	let tyreWearPercentage = tyreData.tyre_set_total_wear_percentage
	let tyreAgePercentage = calculatePercentage(0, tyreAgeMax, tyreAge);

	let tyreAgeColor = getColorFromList(TyreAgeRange, tyreAgePercentage)
	let tyreWearColor = getColorFromList(TyreWearRange, tyreWearPercentage)

	return (
		<Card flex="flex justify-center justify-items-start items-center">

			{/* Compound */}
			<div className="flex grow flex-col justify-center justify-items-center p-4 min-w-48">
				<img src={getTyreCompoundImage(tyreData.tyre_compound_visual)} />
				<span className="text-center text-3xl font-semibold tracking-wide text-mainWhite/80"></span>
			</div>

			{/* Percentage Bars */}
			<div className="flex flex-col divide-y-2 divide-mainBorder/50">

				{/* Laps */}
				<div className="flex grow items-center p-4">
					<span className="text-3xl tracking-wide text-mainWhite/80">Laps</span>

					<LinearProgressBar
						percentage={tyreAgePercentage}
						showPercentage={false}
						color={tyreAgeColor}
						height="1.2rem"
						text={`${tyreAge} lap${tyreAge > 1 ? 's' : ''}`}
						textStyle={{
							fontSize: '1.5rem',
							fontStyle: 'italic',
							textAlign: 'center'
						}}
					/>

					<span className="text-2xl tracking-wide text-mainWhite/80">{tyreAgeMax}</span>
				</div>

				{/* Wear */}
				<div className="flex grow items-center p-4">
					<span className="flex self-center text-3xl tracking-wide text-mainWhite/80">Wear</span>

					<LinearProgressBar
						percentage={tyreWearPercentage}
						showPercentage={false}
						color={tyreWearColor}
						height="1.2rem"
						text={`${tyreWearPercentage}%`}
						textStyle={{
							fontSize: '1.5rem',
							fontStyle: 'italic',
							textAlign: 'center'
						}}
					/>

					<span className="text-2xl tracking-wide text-mainWhite/80">50%</span>
				</div>
			</div>
		</Card>
	)
}

const Row = ({ children }) => (
	<div className="flex grow justify-between content-center items-stretch gap-8 p-4">
		{children}
	</div>
)

const Card = ({ children, flex = "flex justify-center justify-items-center items-center" }) => (
	<div className={`${flex} p-4 border-2 rounded-xl shadow-xl bg-mainDark/50 border-mainBorder/25 shadow-mainDark/50`}>
		{children}
	</div>
)

const FocusPanel = ({ generalData, timingsData, strategyData, tyreData, weatherData }) => {
	let sessionType = generalData.session_type;

	return (
		<div className="flex grow flex-col justify-center content-center items-center p-4 gap-8 border-2 shadow-inner rounded-xl bg-mainLight/80 border-mainBorder/50">

			<Row>
				<SettingsCard ersDeployMode={generalData.ers_deploy_mode} brakeBias={generalData.brake_bias} differential={generalData.differential} />

				<TimingsCard timingsData={timingsData} />

				{(sessionType.includes('PRACTICE') || sessionType.includes('QUALIFYING')) ? (
					<TimeLeftCard time={timingsData.session_time_left} />

				) : (
					<StrategyCard recommendedLapToPit={strategyData.lap_to_pit_recommended} latestLapToPit={strategyData.lap_to_pit_latest} expectedRejoinPosition={strategyData.expected_rejoin_position} />
				)}
			</Row>

			<Row>
				<WeatherCard weatherData={weatherData} />
				<TyreLifeCard tyreData={tyreData} />
			</Row>

			<Row>
				<CarDeltasGraphic
					behindCar={timingsData.driver_behind}
					playerCar={timingsData.player}
					frontCar={timingsData.driver_in_front}
					leaderCar={timingsData.race_leader}
				/>
			</Row>
		</div >
	)
}

export default FocusPanel