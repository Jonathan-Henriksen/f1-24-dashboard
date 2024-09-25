import React, { useEffect, useState } from 'react';
import FocusPanel from 'components/FocusPanel';
import { fetchLatestSessionId, fetchSessionData } from 'utils';

function App() {
	const [sessionId, setSessionId] = useState(null);
	const [sessionData, setSessionData] = useState(null);

	// Continuously fetch the latest sessionId every 5 seconds
	useEffect(() => {
		const fetchSessionId = async () => {
			try {
				const sessionidData = await fetchLatestSessionId();
				if (sessionidData?.sessionId !== sessionId) {
					setSessionId(sessionidData.sessionId);
				}
			} catch (error) {
				console.error('Failed to fetch sessionId:', error);
			}
		};

		const sessionIdInterval = setInterval(fetchSessionId, 5000);
		fetchSessionId();

		return () => clearInterval(sessionIdInterval);
	}, []);

	// Continuously fetch session data every 200ms using the current sessionId
	useEffect(() => {
		if (!sessionId) return;

		const fetchData = async () => {
			try {
				const data = await fetchSessionData(sessionId);
				setSessionData(data);
			} catch (error) {
				console.error('Failed to fetch session data:', error);
			}
		};

		const sessionDataInterval = setInterval(fetchData, 200);
		fetchData();

		return () => clearInterval(sessionDataInterval);
	}, [sessionId]);

	if (!sessionData || !sessionData.drivers || !sessionData.sessionInfo) {
		return <div>No data available</div>;
	}

	const renderSessionData = (sessionType) => {
		if (sessionType.toLowerCase().includes('practice')) {
			return <FocusPanel sessionData={sessionData} />;
		}
		if (sessionType.toLowerCase().includes('qualifying')) {
			return <FocusPanel sessionData={sessionData} />;
		}
		return <div>Unknown session type</div>;
	};

	return (
		<div className="inline-flex grow place-content-center h-dvh w-screen pt-4 pb-12 bg-mainDark text-mainWhite">
			{renderSessionData(sessionData.sessionInfo.sessionType)}
		</div>
	);
}

export default App;
