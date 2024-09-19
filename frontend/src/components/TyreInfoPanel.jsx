import React from "react";
import { getCarTopViewImage } from "helpers/helpers";
import TyreInfoCircle from "./TyreInfoCircle";
import { getColorFromList } from "helpers/colorHelper";

const colorRange = [
	{ color: '#3EBEF7', value: 40 },  // Blue at 40
	{ color: '#2BDD1A', value: 85 },  // Green at 85
	{ color: '#FBCD4C', value: 95 },  // Yellow at 95
	{ color: '#EC3B26', value: 120 }  // Red at 110
];

const tempRange = () => {
	const arr = [];
	for (let i = 120; i >= 40; i--) {
		arr.push(i);
	}

	return arr;
}

const ColorLegend = () => (
	<div className="flex justify-self-start">
		<div className="flex flex-col justify-center items-center p-1 border-2 rounded-xl shadow-xl bg-mainDark/50 border-mainBorder/50 shadow-mainDark/50">
			{tempRange().map((temp, index) => (
				<div key={index} className={`flex grow px-3 py-1 ${index == 0 ? 'rounded-t-lg' : ''}`} style={{ backgroundColor: getColorFromList(colorRange, temp) }}>
				</div>
			))}
		</div>

		<div className="flex flex-col justify-between items-center px-2">
			{tempRange().map((temp, index) => (
				<div>
					{temp % 10 === 0 && (
						<>
							<span className="text-center font-bold bg-transparent">- {temp}°</span>
						</>
					)}
				</div>
			))}
		</div>
	</div>
);

const TyreInfoPanel = ({ data, teamName }) => {
	return (
		<div className="flex grow justify-center px-16 py-12">

			<div className="flex justify-self-start">
				<ColorLegend />
			</div>


			{/* Left Tyres */}
			<div className="flex flex-col justify-between">

				{/* Front */}
				<TyreInfoCircle tyre={data.tyre_front_left} colorRange={colorRange} />

				{/* Rear */}
				<TyreInfoCircle tyre={data.tyre_rear_left} colorRange={colorRange} />
			</div>

			{/* Car Image */}
			<div className="flex justify-center">
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