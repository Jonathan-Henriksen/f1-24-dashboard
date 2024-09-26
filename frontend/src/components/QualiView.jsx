import { fetchQualiData } from 'helpers/apiHelper';
import TimeLeftCard from './cards/TimeLeftCard';
import React from 'react';

const QualificationView = () => {
	const [qualificationData, setQualificationData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchQualiData();
			if (data) setQualificationData(data);
		};

		const qualificationDataInterval = setInterval(fetchData, 200);
		fetchData();

		return () => clearInterval(qualificationDataInterval);
	}, []);

	return (
		<TimeLeftCard time={{ minutes: 0, seconds: qualificationData.timeLeftInSeconds, ms: 0 }} />
	)
}

export default QualificationView