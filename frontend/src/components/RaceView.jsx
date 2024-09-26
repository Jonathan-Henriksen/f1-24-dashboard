import { fetchRaceData } from 'helpers/apiHelper';
import DeltasGraphicCard from './cards/DeltasGraphicCard';
import SettingsCard from './cards/SettingsCard';
import StrategyCard from './cards/StrategyCard';
import TimingsCard from './cards/TimingsCard';
import TyreLifeCard from './cards/TyreLifeCard';
import WeatherCard from './cards/WeatherCard';
import React from "react";

const Row = ({ children }) => (
	<div className="flex grow justify-evenly p-4">
		{children}
	</div>
)

const RaceView = () => {
	const [raceData, setRaceData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchRaceData();
			if (data) setRaceData(data);
		};

		const qualificationDataInterval = setInterval(fetchData, 200);
		fetchData();

		return () => clearInterval(qualificationDataInterval);
	}, []);

	return (
		<div className="flex flex-col justify-center p-4 gap-4 border-2 shadow-inner rounded-xl bg-mainLight/80 border-mainBorder/50">

			<Row>
				<SettingsCard ersDeployMode={generalData.ers_deploy_mode} brakeBias={generalData.brake_bias} differential={generalData.differential} />

				<TimingsCard timingsData={timingsData} pitStatus={generalData.pit_status} />

				<StrategyCard recommendedLapToPit={strategyData.lap_to_pit_recommended} latestLapToPit={strategyData.lap_to_pit_latest} expectedRejoinPosition={strategyData.expected_rejoin_position} />
			</Row>

			<Row>
				<WeatherCard weatherData={weatherData} />
				<TyreLifeCard tyreData={tyreData} />
			</Row>

			<Row>
				<DeltasGraphicCard
					behindCar={timingsData.driver_behind}
					playerCar={timingsData.player}
					frontCar={timingsData.driver_in_front}
					leaderCar={timingsData.race_leader}
				/>
			</Row>
		</div >
	)
}

export default RaceView