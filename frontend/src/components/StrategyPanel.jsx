import { LinearProgressBar } from "react-percentage-bar";
import React from "react";

const RedGreenRange = ({ min, max }) => {
	return [
		{ color: '#2BDD1A', value: min },  // Green
		{ color: '#EC3B26', value: max }   // Red
	];
};

const StrategyPanel = ({ data }) => {
	return (
		<div className="flex grow justify-center items-center gap-8">
			{ /* Lap to pit */}
			<div className="flex flex-col justify-center items-center border-2 rounded-xl shadow-xl p-4 gap-4 divide-y-2 bg-mainDark/50 shadow-mainDark/50 divide-mainBorder/50">
				<span className="text-center text-3xl font-bold uppercase">Lap to pit</span>
				<span className="text-center text-xl font-semibold">Recommended: {data.lap_to_pit_recommended}</span>
				<span className="text-center text-xl font-semibold">Latest lap to pit: {data.lap_to_pit_latest}</span>
			</div>

			{ /* Current Tyre Set */}
			<div className="flex flex-col justify-center items-center border-2 rounded-xl shadow-xl p-4 gap-4 divide-y-2 bg-mainDark/50 shadow-mainDark/50 divide-mainBorder/50">
				<span className="text-center text-3xl font-bold uppercase">Current Tyreset</span>
				<span className="text-center text-xl font-semibold">Wear: {data.tyre_sets_current_wear_percentage}</span>
				<span className="text-center text-xl font-semibold">Laps left: {data.tyre_sets_current_laps_left}</span>
				<span className="text-center text-xl font-semibold">Laps max: {data.tyre_sets_current_compound_laps_max}</span>
			</div>

			{ /* Tyre Sets*/}
			<div className="flex flex-col justify-start items-center">
				{data.tyre_sets_available.map((tyreSet, index) => (
					<span key={index} className="text-xl font-semibold capitalize">{`${tyreSet.compound_visual} (${tyreSet.compound}) - ${tyreSet.wear_percentage}%`}</span>
				))}
			</div>
		</div>
	);
};

export default StrategyPanel;