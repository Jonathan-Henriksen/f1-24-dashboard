import React from "react";
import { getCarTopViewImage } from "helpers/helpers";
import TyreInfoCircle from "./TyreInfoCircle";
import { getColorFromList } from "helpers/colorHelper";

const colorRange = [
	{ color: '#3EBEF7', value: 40 },  // Blue at 40
	{ color: '#2BDD1A', value: 85 },  // Green at 85
	{ color: '#FBCD4C', value: 95 },  // Yellow at 95
	{ color: '#EC3B26', value: 115 }  // Red at 110
];

const tempRange = () => {
	const arr = [];
	for (let i = 115; i >= 40; i--) {
		arr.push(i);
	}

	return arr;
}

const TyreInfoPanel = ({ data, teamName }) => {
	return (
		<div className="flex grow justify-center p-12">

			{/* Color Legend */}
			<div className="flex flex-col justify-center w-10 items-center p-2 border-2 bg-mainDark/50 border-mainBorder/25">
				{tempRange().map((temp, index) => (
					<div key={index} className={"flex grow justify-start px-3 py-1"} style={{ backgroundColor: getColorFromList(colorRange, temp) }}>
						{temp % 10 === 0 && (
							<>
								<span className="text-center font-bold bg-transparent">- {temp}°</span>
							</>
						)}
					</div>
				))}
			</div>

			{/* Left Tyres */}
			<div className="flex flex-col justify-between">

				{/* Front */}
				<TyreInfoCircle tyre={data.tyre_front_left} colorRange={colorRange} />

				{/* Rear */}
				<TyreInfoCircle tyre={data.tyre_rear_left} colorRange={colorRange} />
			</div>

			{/* Car Image */}
			<div className="flex justify-center col-start-4 col-span-2 row-start-3 row-span-6">
				<img src={getCarTopViewImage(teamName)} alt={teamName} className="max-h-full" />
			</div>

			{/* Right Tyres */}
			<div className="flex flex-col justify-between">

				{/* Front */}
				<TyreInfoCircle tyre={data.tyre_front_right} colorRange={colorRange} />

				{/* Rear */}
				<TyreInfoCircle tyre={data.tyre_rear_right} colorRange={colorRange} />
			</div>
		</div>
	);
}

export default TyreInfoPanel;