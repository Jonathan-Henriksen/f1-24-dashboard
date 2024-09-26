import React, { useEffect, useState } from 'react';
import { fetchSessionType } from 'helpers/apiHelper';
import PracticeView from 'components/PracticeView';
import QualificationView from 'components/QualiView';
import RaceView from 'components/RaceView';

function App() {
	const [sessionType, setSessionType] = useState(null);

	const setSSessionTypeFunc = (data) => {
		setSessionType(data)
	}

	// Continuously fetch the session type every 5 seconds
	useEffect(() => {
		const fetchAndSetSessionType = async () => {
			const data = await fetchSessionType();
			if (data && data.sessionType !== sessionType) {
				setSessionType(data.sessionType);
			}
		};

		const sessionIdInterval = setInterval(fetchAndSetSessionType, 5000);
		fetchAndSetSessionType();

		return () => clearInterval(sessionIdInterval);
	}, []);

	if (!sessionType) {
		return <div>No data available</div>;
	}

	const renderView = () => {
		if (sessionType.toLowerCase().includes('practice')) {
			return <PracticeView setSessionType={setSSessionTypeFunc} />;
		}
		else if (sessionType.toLowerCase().includes('qualifying')) {
			return <QualificationView setSessionType={setSSessionTypeFunc} />;
		}
		else if (sessionType.toLowerCase().includes('race')) {
			return <RaceView setSessionType={setSSessionTypeFunc} />;
		}
		else {
			return <div>Unknown session type</div>;
		}
	};

	return (
		<div className="inline-flex grow place-content-center h-dvh w-screen pt-4 pb-12 bg-mainDark text-mainWhite">
			{renderView()}
		</div>
	);
}

export default App;
