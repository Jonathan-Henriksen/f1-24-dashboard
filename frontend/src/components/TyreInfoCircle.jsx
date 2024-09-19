import { CircularProgressBar } from "react-percentage-bar";
import { calculatePercentage } from "helpers/helpers";
import { getColorFromList } from "helpers/colorHelper";
import React from "react";

const colorScale = [
	'#3EBEF7', // Blue
	'#3EBEF7', // Blue
	'#2BDD1A', // Green
	'#FBCD4C', // Yellow
	'#FE5823', // Orange
	'#EC3B26' // Red
]

const colorScale2 = [
	'#3EBEF7', // Blue
	'#2BDD1A', // Green
	'#EC3B26' // Red

]

const TyreInfoCircle = ({ tyre }) => {
	let surfaceColor = getColorFromList(colorScale2, calculatePercentage(40, 130, tyre.temperature_surface))
	let carcassColor = getColorFromList(colorScale2, calculatePercentage(40, 130, tyre.temperature_carcass))

	return (
		<div className="flex justify-center p-4 border-2 rounded-xl shadow-lg bg-mainDark/50 border-mainBorder/25 shadow-mainDark/75">
			<div className="brightness-90">
				<CircularProgressBar
					percentage={0}
					showPercentage={false}
					trackColor={surfaceColor}
					radius="9.5rem"
					size="1.5rem"
				>
					<CircularProgressBar
						percentage={0}
						showPercentage={false}
						trackColor={carcassColor}
						radius="8rem"
						size="3rem"
						text={`${tyre.temperature_carcass}°C`}
						textStyle={{
							color: 'white',
							fontSize: '3rem',
							fontStyle: 'bold'
						}}
					/>
				</CircularProgressBar >
			</div>
		</div>
	);
};

export default TyreInfoCircle;