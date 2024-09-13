import React, { useEffect, useState } from 'react';
import { fetchMFDData } from './services/api';
import Navigation from './components/Navigation';
import TimingsPanel from './components/TimingsPanel';
import StrategyPanel from './components/StrategyPanel';
import TyreInfoPanel from './components/TyreInfoPanel';
import LeaderboardPanel from './components/LeaderboardPanel';
import WeatherPanel from './components/WeatherPanel';
import DamagePanel from './components/DamagePanel';
import './App.css';


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

	// Render active panel based on active index
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
		<div className="app-container flex flex-col h-screen bg-f1Grey text-white">
			<div className="nav-container">
				<Navigation panels={mfdData.panels} activePanelIndex={mfdData.active_panel_index} />
			</div>
			<div className="panel-container flex-grow">
				{renderActivePanel()}
			</div>
		</div>
	);
}

export default App;
