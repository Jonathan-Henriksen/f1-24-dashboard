import { getCarTopViewImage } from "helpers/helpers";
import React from "react";

const TyreInfoPanel = ({ panelData, teamName }) => {
	return (
		<div className="flex grow justify-center">
			{/* Left Tyres */}
			<div className="flex flex-col justify-between">

				{/* Front */}
				<div className="flex flex-col justify-start rounded-full p-8 border-2 bg-f1Green border-mainBorder/25">
					<span>88C</span>
					<div className="grow rounded-full p-8 border-2 bg-mainBlue/80 border-mainBorder/25">
						<span>27%</span>
					</div>
				</div>

				{/* Rear */}
				<div className="flex flex-col justify-start rounded-full p-8 border-2 bg-f1Green border-mainBorder/25">
					<span>88C</span>
					<div className="grow rounded-full p-8 border-2 bg-mainBlue/80 border-mainBorder/25">
						<span>27%</span>
					</div>
				</div>
			</div>

			{/* Car Image */}
			<div className="flex justify-center grow col-start-4 col-span-2 row-start-3 row-span-6">
				<img src={getCarTopViewImage(teamName)} alt={teamName} className="max-w-full" />
			</div>

			{/* Right Tyres */}
			<div className="flex flex-col justify-between">

				{/* Front */}
				<div className="flex flex-col justify-start rounded-full p-8 border-2 bg-f1Green border-mainBorder/25">
					<span>88C</span>
					<div className="grow rounded-full p-8 border-2 bg-mainBlue/80 border-mainBorder/25">
						<span>27%</span>
					</div>
				</div>

				{/* Rear */}
				<div className="flex flex-col justify-start rounded-full p-8 border-2 bg-f1Green border-mainBorder/25">
					<span>88C</span>
					<div className="grow rounded-full p-8 border-2 bg-mainBlue/80 border-mainBorder/25">
						<span>27%</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TyreInfoPanel;