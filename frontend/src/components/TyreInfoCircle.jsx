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
	return (
		<CircularProgressBar
			percentage={0}
			showPercentage={false}
			trackColor={getColorFromList(colorScale, calculatePercentage(50, 110, tyre.temperature_surface))}
			radius="6rem"
			startDelay={10}
		>
			<CircularProgressBar
				percentage={0}
				showPercentage={false}
				trackColor={getColorFromList(colorScale, calculatePercentage(50, 110, tyre.temperature_carcass))}
				radius="4.5rem"
				text={`${Math.trunc(tyre.wear_percentage)}%`}
				startDelay={10}
			/>
		</CircularProgressBar >
	);
};

export default TyreInfoCircle;