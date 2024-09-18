import { CircularProgressBar } from "react-percentage-bar";
import { calculatePercentage } from "helpers/helpers";
import React from "react";

const TyreInfoCircle = ({ tyre }) => {
	return (
		<CircularProgressBar
			percentage={calculatePercentage(30, 120, tyre.temperature_surface)}
			showPercentage={false}
			startPosition="180"
			color={[
				'#3EBEF7',
				'#00D369',
				'#D0021B'
			]}
			radius="6rem"
			startDelay={10}
			trackColor="#D8D8D866"
		>
			<CircularProgressBar
				percentage={calculatePercentage(30, 120, tyre.temperature_carcass)}
				showPercentage={true}
				startPosition="180"
				antiClockWise={true}
				color={[
					'#3EBEF7',
					'#00D369',
					'#D0021B'
				]}
				radius="4.5rem"
				startDelay={10}
				trackColor="#D8D8D866"
			/>
		</CircularProgressBar>
	);
};

export default TyreInfoCircle;