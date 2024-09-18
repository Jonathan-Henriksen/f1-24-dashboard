import { calculatePercentage } from "helpers/helpers";
import React from "react";

const TyreInfoCircle = ({ tyre }) => {
	return (
		<CircularProgressBar
			percentage={calculatePercentage(30, 120, tyre.temperature_surface)}
			showPercentage={true}
			color={[
				'#fc2947',
				'#7149c6'
			]}
			radius="6rem"
			shadow={true}
			startDelay={10}
			trackColor="#D8D8D866"
		>
			<CircularProgressBar
				percentage={calculatePercentage(30, 120, tyre.temperature_carcass)}
				showPercentage={true}
				antiClockWise={true}
				color={[
					'#fc2947',
					'#7149c6'
				]}
				radius="4.5rem"
				shadow={true}
				startDelay={10}
				trackColor="#D8D8D866"
			/>
		</CircularProgressBar>
	);
};

export default TyreInfoCircle;