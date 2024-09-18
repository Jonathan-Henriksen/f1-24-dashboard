import { getCarTopViewImage } from "helpers/helpers";
import React from "react";

const TyreInfoPanel = ({ panelData, teamName }) => {
	return (
		<div className="grow grid grid-cols-16 grid-rows-8 gap-8 p-8">
			<div className="col-start-4 col-span-12 row-start-1 row-span-2"></div>

			{/* Front Left Temperatures */}
			<div className="col-start-4 row-start-3 col-span-2 row-span-2 border-2 bg-mainDark/50  border-mainBorder/25">
				<div className="flex grow flex-col justify-start rounded-full p-8 border-2 bg-f1Green border-mainBorder/25">
					<span>88C</span>
					<div className="grow rounded-full p-8 border-2 bg-mainBlue/80 border-mainBorder/25">
						<span>27%</span>
					</div>
				</div>
			</div>

			<div className="col-start-12 row-start-3 col-span-2 row-span-2 border-2 bg-mainDark/50  border-mainBorder/25"></div>

			{/* Car Image */}
			<div className="flex justify-center grow col-start-8 col-span-2 row-start-3 row-span-6">
				<img src={getCarTopViewImage(teamName)} alt={teamName} className="max-w-full" />
			</div>

			<div className="col-start-4 row-start-7 col-span-2 row-span-2 border-2 bg-mainDark/50  border-mainBorder/25"></div>
			<div className="col-start-12 row-start-7 col-span-2 row-span-2 border-2 bg-mainDark/50  border-mainBorder/25"></div>
		</div>
	);
}

export default TyreInfoPanel;