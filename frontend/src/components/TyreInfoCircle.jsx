import { CircularProgressBar } from "react-percentage-bar";
import { getColorFromList } from "helpers/colorHelper";
import React from "react";

const TyreInfoCircle = ({ colorRange, tyre }) => {
	return (
		<div className="flex justify-center p-4 border-2 rounded-xl shadow-lg bg-mainDark/50 border-mainBorder/25 shadow-mainDark/75">

			{/* Tyre Data */}
			<div className="flex flex-col justify-center divide-y-2 gap-2 divide-mainWhite/50 ">

				{/* Titles */}
				<div className="flex justify-evenly justify-items-stretch">
					<span className="grow text-center text-xl uppercase">Break</span>
					<span className="grow text-center text-xl uppercase">Carcass</span>
					<span className="grow text-center text-xl uppercase">Surface</span>
					<span className="grow text-center text-xl uppercase">Wear</span>
				</div>
				{/* Values */}
				<div className="flex justify-evenly justify-items-stretch">
					<span> <span className="grow text-center text-lg font-bold">{tyre.temperature_brakes}°C</span></span>
					<span> <span className="grow text-center text-lg font-bold">{tyre.temperature_carcass}°C</span></span>
					<span> <span className="grow text-center text-lg font-bold">{tyre.temperature_surface}°C</span></span>
					<span> <span className="grow text-center text-lg font-bold">{Math.trunc(tyre.wear_percentage)}%</span></span>
				</div>
			</div>

			{/* Tyre Graphic */}
			<div className="opacity-70">
				<CircularProgressBar
					percentage={0}
					showPercentage={false}
					trackColor={getColorFromList(colorRange, tyre.temperature_surface)}
					radius="6rem"
					size="1.5rem"
				>
					<CircularProgressBar
						percentage={0}
						showPercentage={false}
						trackColor={getColorFromList(colorRange, tyre.temperature_carcass)}
						radius="4.5rem"
						size="2rem"
					>
						<CircularProgressBar
							chartValue={{
								[tyre.wear_percentage]: '#282927',
								'100': getColorFromList(colorRange, tyre.temperature_carcass)
							}}
							radius="2.5rem"
							styles="pie-chart"
						/>
					</CircularProgressBar>
				</CircularProgressBar >
			</div>
		</div>
	);
};

export default TyreInfoCircle;