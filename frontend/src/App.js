import React, { useEffect, useState } from 'react';
import { fetchMFDData } from './services/api';
import Navigation from './components/Navigation';
import TimingsPanel from './components/TimingsPanel';
import StrategyPanel from './components/StrategyPanel';
import TyreInfoPanel from './components/TyreInfoPanel';
import LeaderboardPanel from './components/LeaderboardPanel';
import WeatherPanel from './components/WeatherPanel';
import DamagePanel from './components/DamagePanel';
import FocusPanel from 'components/FocusPanel';

function App() {
	const [mfdData, setMfdData] = useState(null);

	// Fetch data every 200ms
	useEffect(() => {
		const interval = setInterval(async () => {
			const data = await fetchMFDData();
			setMfdData(data);
		}, 200);

		return () => clearInterval(interval); // Clean up interval on component unmount
	}, []);

	if (!mfdData || !mfdData.panels) {
		return <div>Loading...</div>;
	}

	const activePanel = mfdData.panels[mfdData.active_panel_index] || null;

	const renderActivePanel = () => {
		switch (mfdData.active_panel_index) {
			case 0: return <TimingsPanel data={activePanel} sessionType={mfdData.session_type} />;
			case 1: return <TyreInfoPanel data={activePanel} teamName={mfdData.player ? mfdData.player.team : ''} />;
			case 2: return <StrategyPanel data={activePanel} />;
			case 3: return <LeaderboardPanel data={activePanel.drivers} />;
			case 4: return <WeatherPanel data={activePanel} />;
			case 5: return <DamagePanel data={activePanel} />;
			default: return null;
		}
	};

	return (
		<div className="inline-flex grow h-dvh w-screen pt-4 pb-12 bg-mainDark text-mainWhite">

			{mfdData.focus_mode ? (
				<div classname="flex grow place-self-center justify-center items-center">
					<FocusPanel generalData={mfdData} timingsData={mfdData.panels[0]} tyreData={mfdData.panels[1]} strategyData={mfdData.panels[2]} weatherData={mfdData.panels[4]} />
				</div>

			) : (
				<div className="flex grow flex-col justify-start">
					{/* Navigation */}
					<div class="flex flex-col justify-stretch items-stretch pt-2 pb-6 px-16 border-b-2 border-b-mainBorder/25">
						<Navigation panels={mfdData.panels} activePanelIndex={mfdData.active_panel_index} />
					</div>

					{/* Current Settings */}
					<div class="flex justify-stretch items-center py-2 px-32 border-b-2 shadow-inner rounded-xl bg-mainLight/50 border-mainBorder/25">
						<span className="text-center text-xl font-bold">ERS Mode: <span className="capitalize">{mfdData.ers_deploy_mode}</span></span>
						<span className="text-center text-xl font-bold">Differential: {mfdData.differential_pct}%</span>
						<span className="text-center text-xl font-bold">Brake Bias: {mfdData.front_brake_bias}%</span>
						<span className="text-center text-xl font-bold">Lap Time: <span className={`${mfdData.current_lap_invalid ? 'text-mainRed' : 'text-mainWhite/25'}`}>Invalid</span></span>
					</div>

					{/* Active Panel */}
					<div className="flex grow flex-col justify-stretch content-stretch shadow-inner rounded-xl p-4 border-b-2 bg-mainLight shadow-mainDark border-y-mainBorder/25">
						{renderActivePanel()}
					</div>
				</div>
			)}

		</div>
	);
}

export default App;
