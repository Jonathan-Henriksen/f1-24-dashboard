import React from "react";

const TyreInfoCircle = ({ tyre }) => {
	return (
		<div className="flex flex-col justify-start rounded-full p-8 border-2 bg-f1Green border-mainBorder/25">
			<span>{tyre.temperature_surface}C</span>
			<div className="flex flex-col justify-start rounded-full p-8 border-4 bg-f1Green border-mainBorder/25">
				<span>{<span>{tyre.temperature_carcass}C</span>}C</span>
				<div className="grow rounded-full p-8 border-4 bg-mainBlue/80 border-mainBorder/25">
					<span>{Math.trunc(tyre.wear_percentage)}%</span>
				</div>
			</div>
		</div>
	);
};

export default TyreInfoCircle;