import { fetchPracticeData } from 'helpers/apiHelper';
import TimeLeftCard from './cards/TimeLeftCard';
import React from 'react';

const PracticeView = () => {
	const [practiceData, setPracticeData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchPracticeData();
			if (data) setPracticeData(data);
		};

		const practiceDataInterval = setInterval(fetchData, 200);
		fetchData();

		return () => clearInterval(practiceDataInterval);
	}, []);

	return (
		<TimeLeftCard time={{ minutes: 0, seconds: practiceData.timeLeftInSeconds, ms: 0 }} />
	)
}

export default PracticeView