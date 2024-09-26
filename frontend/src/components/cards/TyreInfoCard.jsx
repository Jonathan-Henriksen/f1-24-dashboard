import { CircularProgressBar } from "react-percentage-bar";
import { getColorFromList } from "helpers/colorHelper";
import React from "react";
import Card from "./Card";

const TyreData = ({ tyre, inverted }) => (
	<div className="flex justify-center gap-4 px-4 shadow-inner rounded-xl border-2 bg-mainLight border-mainBorder/25 divide-x-2 divide-mainWhite/50">
		{/* Titles */}
		<div className="flex flex-col justify-evenly justify-items-center items-start">
			<div className="flex items-center justify-center">
				<p className="text-center text-xl font-bold uppercase">Surface</p>
			</div>
			<div className="flex items-center justify-center">
				<p className="text-center text-xl font-bold uppercase">Carcass</p>
			</div>
			<div className="flex items-center justify-center">
				<p className="text-center text-xl font-bold uppercase">Break</p>
			</div>
			<div className="flex items-center justify-center">
				<p className="text-center text-xl font-bold uppercase">Wear</p>
			</div>
		</div>
		{/* Values */}
		<div className="flex flex-col justify-evenly justify-items-center items-start pl-4">
			<div className="flex items-center justify-center">
				<p className="text-center text-xl font-semibold">{tyre.temperature_surface}°C</p>
			</div>
			<div className="flex items-center justify-center">
				<p className="text-center text-xl font-semibold">{tyre.temperature_carcass}°C</p>
			</div>
			<div className="flex items-center justify-center">
				<p className="text-center text-xl font-semibold">{tyre.temperature_brakes}°C</p>
			</div>
			<div className="flex items-center justify-center">
				<p className="text-center text-xl font-semibold">{Math.trunc(tyre.wear_percentage)}%</p>
			</div>
		</div>
	</div>
)

const TyreGraphic = ({ colorRange, tyre }) => (
	<div className="opacity-70 ">
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
		<Card flex="flex justify-center">
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
		</Card>
	);
};


export default TyreInfoCard;