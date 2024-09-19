import { CircularProgressBar } from "react-percentage-bar";
import { calculatePercentage } from "helpers/helpers";
import { getColorFromList } from "helpers/colorHelper";
import React from "react";

const colorScale = [
	'#3EBEF7',
	'#00D369',
	'#D0021B'
]

const TyreInfoCircle = ({ tyre }) => {
	let surfaceColor = getColorFromList(colorScale, calculatePercentage(50, 110, tyre.temperature_surface))
	let carcassColor = getColorFromList(colorScale, calculatePercentage(50, 110, tyre.temperature_carcass))

	return (
		<CircularProgressBar
			percentage={0}
			showPercentage={false}
			trackColor={surfaceColor}
			size="2rem"
			radius="16rem"
		>
			<CircularProgressBar
				percentage={0}
				showPercentage={false}
				trackColor={carcassColor}
				size="4rem"
				radius="6rem"
				backgroundColor={carcassColor}
				text={`${tyre.temperature_carcass}°C`}
				textStyle={{
					fontStyle: 'bold'
				}}
			/>
		</CircularProgressBar >
	);
};

export default TyreInfoCircle;