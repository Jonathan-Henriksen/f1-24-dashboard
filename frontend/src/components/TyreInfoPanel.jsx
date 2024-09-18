import React from "react";
import { getCarTopViewImage } from "helpers/helpers";
import TyreInfoCircle from "./TyreInfoCircle";

const TyreInfoPanel = ({ data, teamName }) => {
	return (
		<div className="flex grow flex-col space-y-4 justify-start">

			{/* Header */}
			<div className="flex justify-center items-center p-16 border-2 bg-mainDark/50 border-mainBorder/25">
				<span>Current Tyre Wear</span>
			</div>

			{/* Tyres Graphic */}
			<div className="flex grow justify-center">

				{/* Left Tyres */}
				<div className="flex flex-col justify-between">

					{/* Front */}
					<TyreInfoCircle tyre={data.tyre_front_left} />

					{/* Rear */}
					<TyreInfoCircle tyre={data.tyre_rear_left} />
				</div>

				{/* Car Image */}
				<div className="flex justify-center col-start-4 col-span-2 row-start-3 row-span-6">
					<img src={getCarTopViewImage(teamName)} alt={teamName} className="max-h-full" />
				</div>

				{/* Right Tyres */}
				<div className="flex flex-col justify-between">

					{/* Front */}
					<TyreInfoCircle tyre={data.tyre_front_right} />

					{/* Rear */}
					<TyreInfoCircle tyre={data.tyre_rear_right} />
				</div>
			</div>
		</div>
	);
}

export default TyreInfoPanel;