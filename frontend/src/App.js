import React, { useEffect, useState } from 'react';
import { fetchSessionType } from 'helpers/apiHelper';
import PracticeView from 'components/PracticeView';
import QualificationView from 'components/QualiView';
import RaceView from 'components/RaceView';

function App() {
	const [sessionType, setSessionType] = useState(null);

	const setSSessionTypeFunc = (data) => {
		setSessionType(data);
	};

	useEffect(async () => {
		const data = await fetchSessionType();
		if (data && data.sessionType) {
			setSessionType(data.sessionType);
		}

	}, []);

	const renderView = () => {
		if (sessionType.toLowerCase().includes('practice')) {
			return <PracticeView setSessionType={setSSessionTypeFunc} />;
		} else if (sessionType.toLowerCase().includes('qualifying')) {
			return <QualificationView setSessionType={setSSessionTypeFunc} />;
		} else if (sessionType.toLowerCase().includes('race')) {
			return <RaceView setSessionType={setSSessionTypeFunc} />;
		} else {
			return <div>Unknown session type</div>;
		}
	};

	return (
		<div className="inline-flex grow place-content-center h-dvh w-screen pt-4 pb-12 bg-mainDark text-mainWhite">
			{sessionType ? renderView() : <div>Waiting for session type...</div>}
		</div>
	);
}

export default App;
