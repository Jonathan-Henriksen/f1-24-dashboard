import React from "react";
import { getColorFromList } from "helpers/colorHelper";

// C3 Range
const colorRange = [
	{ color: '#3EBEF7', value: 50 },  // Blue
	{ color: '#2BDD1A', value: 85 },  // Green
	{ color: '#2BDD1A', value: 95 },  // Green
	{ color: '#FBCD4C', value: 110 },  // Yellow
	{ color: '#EC3B26', value: 130 }  // Red
];

const tempRange = () => {
	const minValue = Math.min(...colorRange.map(item => item.value));
	const maxValue = Math.max(...colorRange.map(item => item.value));

	const arr = [];
	for (let i = maxValue; i >= minValue; i--) {
		arr.push(i);
	}

	return arr;
}

const ColorLegendCard = ({ tyreCompound }) => (
	<div className="flex flex-col justify-start items-center justify-self-start">
		<span className="text-center text-3xl font-semibold rounded-full shadow-inner px-6 py-2 border-2 mb-2 -mt-6 border-mainBorder/25">{tyreCompound}</span>
		<div className="flex grow">
			<div className="flex flex-col justify-center items-center p-1 border-2 rounded-xl shadow-xl bg-mainDark/50 border-mainBorder/50 shadow-mainDark/50">
				{tempRange().map((temp, index) => (
					<div key={index} className={`flex grow px-3 py-1 ${index == 0 ? 'rounded-t-lg' : ''}`} style={{ backgroundColor: getColorFromList(colorRange, temp) }}>
					</div>
				))}
			</div>

			<div className="flex flex-col justify-between items-center px-2">
				{tempRange().map((temp, index) => (
					<div key={index} >
						{temp % 10 === 0 && (
							<>
								<span className="text-center font-bold bg-transparent">- {temp}°</span>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	</div>
);

export default ColorLegendCard