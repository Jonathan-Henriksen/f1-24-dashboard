import { getColorFromList } from "helpers/colorHelper";
import { getTyreCompoundImage } from "helpers/imageHelper";
import { calculatePercentage } from "utils";
import React from "react";

const TyreAgeRange = [
	{ color: '#2BDD1A', value: 0 },  // Green
	{ color: '#FBCD4C', value: 50 },  // Yellow
	{ color: '#EC3B26', value: 100 }  // Red
];

const TyreWearRange = [
	{ color: '#2BDD1A', value: 0 },  // Green
	{ color: '#FBCD4C', value: 20 },  // Yellow
	{ color: '#EC3B26', value: 40 },  // Red
	{ color: '#EC3B26', value: 100 }  // Red
];


const TyreLifeCard = ({ tyreData }) => {
	let tyreDataClone = { ...tyreData }; // Ensure new object reference
	let tyreAge = tyreDataClone.tyre_set_laps_age;
	let tyreAgeMax = tyreDataClone.tyre_set_laps_max;
	let tyreLapsRemaing = tyreDataClone.tyre_set_laps_remaining;

	let tyreWearPercentage = tyreDataClone.tyre_set_total_wear_percentage
	let tyreAgePercentage = calculatePercentage(0, tyreAgeMax, tyreAge);

	let tyreAgeColor = getColorFromList(TyreAgeRange, tyreAgePercentage)
	let tyreWearColor = getColorFromList(TyreWearRange, tyreWearPercentage)

	return (
		<Card flex="flex self-center items-center">

			{/* Compound */}
			<div className="flex flex-col justify-center items-center gap-2 p-4">
				<span className="text-center text-3xl font-semibold tracking-wide text-mainWhite/80">{tyreDataClone.tyre_compound}</span>
				<img src={getTyreCompoundImage(tyreDataClone.tyre_compound_visual)} className="min-w-20 max-w-28 aspect-square" />
			</div>

			{/* Percentage Bars */}
			<div className="flex flex-col divide-y-2 divide-mainBorder/50">

				{/* Laps */}
				<div className="flex items-center p-4">
					<span className="text-3xl tracking-wide text-mainWhite/80">Laps</span>

					<LinearProgressBar
						percentage={tyreAgePercentage}
						showPercentage={false}
						color={tyreAgeColor}
						height="1.2rem"
						text={`${tyreAge} lap${tyreAge > 1 ? 's' : ''}`}
						textStyle={{
							fontSize: '1.5rem',
							fontStyle: 'italic',
							textAlign: 'center'
						}}
					/>

					<span className="text-2xl tracking-wide text-mainWhite/80">{tyreAgeMax}</span>
				</div>

				{/* Wear */}
				<div className="flex items-center p-4">
					<span className="text-3xl tracking-wide text-mainWhite/80">Wear</span>

					<LinearProgressBar
						percentage={tyreWearPercentage * 2}
						showPercentage={false}
						color={tyreWearColor}
						height="1.2rem"
						text={`${tyreWearPercentage}%`}
						textStyle={{
							fontSize: '1.5rem',
							fontStyle: 'italic',
							textAlign: 'center'
						}}
					/>

					<span className="text-2xl tracking-wide text-mainWhite/80">50%</span>
				</div>
			</div>
		</Card>
	)
}

export default TyreLifeCard