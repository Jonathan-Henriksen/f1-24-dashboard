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
		<div className="p-4 b-2 rounded-xl shadow-lg bg-mainDark/50 border-mainBorder/25 shadow-mainDark/75">
			<CircularProgressBar
				percentage={0}
				showPercentage={false}
				trackColor={surfaceColor}
				radius="9rem"
				size="2rem"
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
	);
};

export default TyreInfoCircle;