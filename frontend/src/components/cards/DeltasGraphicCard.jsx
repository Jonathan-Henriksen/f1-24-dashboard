import React from 'react';
import { formatTime } from "utils";
import { getCarImage } from 'helpers/imageHelper'
import { getTeamColor } from 'helpers/colorHelper'

const DeltasGraphicCard = ({ behindCar, playerCar, frontCar, leaderCar }) => {
	const carsToRender = [];
	if (leaderCar) carsToRender.push({ type: 'leader', ...leaderCar });
	if (frontCar) carsToRender.push({ type: 'front', ...frontCar });
	carsToRender.push({ type: 'player', ...playerCar });
	if (behindCar) carsToRender.push({ type: 'behind', ...behindCar });

	return (
		<div className="flex items-center">
			{carsToRender.map((car, index) => (
				<React.Fragment key={car.name}>
					<div className="flex flex-shrink flex-col items-center">
						<div className="flex flex-row items-center">
							<div className="flex justify-center items-center lg:text-lg text-xl font-bold w-12 h-10 mr-2 rounded-full border-2 shadow-lg text-mainWhite/75 bg-mainDark/50 border-mainBorder/25 shadow-mainDark/50">P{car.position}</div>
							<div className={`capitalize xl:text-xl text-3xl ${getTeamColor(car.team)}`}>
								{car.type === 'player' ? 'You' : car.name.toLowerCase()}
							</div>
						</div>
						<img src={getCarImage(car.team)} alt={car.name} className="max-w-full scale-x-[-1]" />
					</div>

					{index < carsToRender.length - 1 && (
						<span className={`md:text-lg xl:text-xl text-2xl shadow-inner shadow-mainDark/50  text-${car.type === 'behind' ? 'f1Green' : 'f1DeltaRed'}/90`}>
							{car.delta_to_player ? formatTime(car.delta_to_player) : null}
						</span>
					)}
				</React.Fragment>
			))}
		</div>
	);
};

export default DeltasGraphicCard;
