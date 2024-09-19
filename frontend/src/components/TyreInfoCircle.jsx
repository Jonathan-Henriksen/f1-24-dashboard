import { CircularProgressBar } from "react-percentage-bar";
import { getColorFromList } from "helpers/colorHelper";
import React from "react";

const colorRange = [
	{ color: '#3EBEF7', value: 40 },  // Blue at 40
	{ color: '#2BDD1A', value: 85 },  // Green at 85
	{ color: '#FBCD4C', value: 95 },  // Yellow at 95
	{ color: '#EC3B26', value: 115 }  // Red at 110
];

const TyreInfoCircle = ({ tyre }) => {
	return (
		<div className="flex justify-center p-4 border-2 rounded-xl shadow-lg bg-mainDark/50 border-mainBorder/25 shadow-mainDark/75">
			<div className="opacity-75">
				<CircularProgressBar
					percentage={0}
					showPercentage={false}
					trackColor={getColorFromList(colorRange, tyre.temperature_surface)}
					radius="9.5rem"
					size="1.5rem"
				>
					<CircularProgressBar
						percentage={0}
						showPercentage={false}
						trackColor={getColorFromList(colorRange, tyre.temperature_carcass)}
						radius="8rem"
						size="3rem"
						padding="5px"
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