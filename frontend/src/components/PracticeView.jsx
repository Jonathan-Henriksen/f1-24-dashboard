import React, { useEffect, useState } from 'react';
import { fetchPracticeData } from 'helpers/apiHelper';
import TimeLeftCard from './cards/TimeLeftCard';

const PracticeView = ({ setSessionType }) => {
	const [practiceData, setPracticeData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchPracticeData();

			// Check if sessionType is not 'practice' and update the App's sessionType
			if (data && !data.sessionType.toLowerCase().includes('practice')) {
				setSessionType(data.sessionType);
			} else if (data) {
				setPracticeData(data);
			}
		};

		const practiceDataInterval = setInterval(fetchData, 200);
		fetchData(); // Initial fetch

		return () => clearInterval(practiceDataInterval); // Cleanup interval on unmount
	}, [setSessionType]); // Add setSessionType to dependency array

	if (!practiceData) {
		return <div>Loading practice data...</div>;
	}

	return (
		<TimeLeftCard seconds={practiceData.timeLeftInSeconds} />
	);
}

export default PracticeView;
