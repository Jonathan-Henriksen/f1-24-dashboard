import { CircularProgressBar } from "react-percentage-bar";
import { getColorFromList } from "helpers/colorHelper";
import React from "react";

const TyreData = ({ tyre, inverted }) => (
	<div className={`flex justify-center divide-x-2 gap-4 divide-mainWhite/50 ${inverted ? 'pl-4' : 'pr-4'}`}>

		{/* Titles */}
		<div className="flex flex-col justify-evenly justify-items-center items-start">
			<span className="flex grow content-center text-center text-xl font-bold uppercase">Surface</span>
			<span className="flex grow content-center text-center text-xl font-bold uppercase">Carcass</span>
			<span className="flex grow content-center text-center text-xl font-bold uppercase">Break</span>
			<span className="flex grow content-center text-center text-xl font-bold uppercase">Wear</span>
		</div>
		{/* Values */}
		<div className="flex flex-col justify-evenly justify-items-center items-start pl-4">
			<span className="flex grow content-center text-center text-xl font-bold">{tyre.temperature_surface}°C</span>
			<span className="flex grow content-center text-center text-xl font-bold">{tyre.temperature_carcass}°C</span>
			<span className="flex grow content-center text-center text-xl font-bold">{tyre.temperature_brakes}°C</span>
			<span className="flex grow content-center text-center text-xl font-bold">{Math.trunc(tyre.wear_percentage)}%</span>
		</div>
	</div>
)

const TyreGraphic = ({ colorRange, tyre }) => (
	<div className="opacity-70">
		<CircularProgressBar
			percentage={0}
			showPercentage={false}
			trackColor={getColorFromList(colorRange, tyre.temperature_surface)}
			radius="6rem"
			size="1.5rem"
		>
			<CircularProgressBar
				percentage={0}
				showPercentage={false}
				trackColor={getColorFromList(colorRange, tyre.temperature_carcass)}
				radius="4.5rem"
				size="2rem"
			>
				<CircularProgressBar
					chartValue={{
						[tyre.wear_percentage]: '#282927',
						'100': getColorFromList(colorRange, tyre.temperature_carcass)
					}}
					radius="2.5rem"
					styles="pie-chart"
				/>
			</CircularProgressBar>
		</CircularProgressBar >
	</div>
)

const TyreInfoCard = ({ colorRange, tyre, inverted = false }) => {
	console.log(`Color Range = ${colorRange}`);
	return (
		<div className="flex justify-center p-4 border-2 rounded-xl shadow-lg bg-mainDark/50 border-mainBorder/25 shadow-mainDark/75">
			{inverted ? (
				<>
					<TyreGraphic tyre={tyre} colorRange={colorRange} />
					<TyreData tyre={tyre} inverted={inverted} />
				</>
			) : (
				<>
					<TyreData tyre={tyre} />
					<TyreGraphic tyre={tyre} colorRange={colorRange} />
				</>
			)}
		</div>
	);
};


export default TyreInfoCard;