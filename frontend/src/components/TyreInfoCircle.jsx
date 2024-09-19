import { CircularProgressBar } from "react-percentage-bar";
import { getColorFromList } from "helpers/colorHelper";
import React from "react";

const TyreInfoCircle = ({ colorRange, tyre }) => {
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
					>
						<CircularProgressBar
							color={getColorFromList(colorRange, tyre.temperature_carcass)}
							styles="pie-chart"
							percentage={tyre.wear_percentage}
							showPercentage={true}
						/>
					</CircularProgressBar>
				</CircularProgressBar >
			</div>
		</div>
	);
};

export default TyreInfoCircle;