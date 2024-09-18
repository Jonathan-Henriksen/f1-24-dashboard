import { getCarTopViewImage } from "helpers/helpers";
import React from "react";

const TyreInfoPanel = ({ panelData, teamName }) => {
	return (
		<div className="grow grid grid-cols-8 grid-rows-8 gap-4 px-8 py-4">
			<div className="col-start-2 col-span-6 row-start-1 row-span-2 border-2 bg-mainDark/50  border-mainBorder/25"></div>

			<div className="col-start-2 row-start-3 col-span-2 row-span-2 border-2 bg-mainDark/50  border-mainBorder/25"></div>
			<div className="col-start-6 row-start-3 col-span-2 row-span-2 border-2 bg-mainDark/50  border-mainBorder/25"></div>

			{/* Car Image */}
			<div className="flex items-center grow col-start-4 col-span-2 row-start-3 row-span-6">
				<img src={getCarTopViewImage(teamName)} alt={teamName} className="max-w-full" />
			</div>

			<div className="col-start-2 row-start-7 col-span-2 row-span-2 border-2 bg-mainDark/50  border-mainBorder/25"></div>
			<div className="col-start-6 row-start-7 col-span-2 row-span-2 border-2 bg-mainDark/50  border-mainBorder/25"></div>
		</div>
	);
}

export default TyreInfoPanel;