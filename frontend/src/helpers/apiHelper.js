const API_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}:5000/api`;

export const fetchSessionType = async () => {
	try {
		const response = await axios.get(`${API_URL}/sessionType`);
		return response.data;
	} catch (error) {
		console.error("Error fetching session type", error);
		return null;
	}
};

export const fetchPracticeData = async () => {
	try {
		const response = await axios.get(`${API_URL}/practice`);
		return response.data;
	} catch (error) {
		console.error("Error fetching practice data", error);
		return null;
	}
};

export const fetchQualiData = async () => {
	try {
		const response = await axios.get(`${API_URL}/qualification`);
		return response.data;
	} catch (error) {
		console.error("Error fetching qualification data", error);
		return null;
	}
};

export const fetchRaceData = async () => {
	try {
		const response = await axios.get(`${API_URL}/race`);
		return response.data;
	} catch (error) {
		console.error("Error fetching race data", error);
		return null;
	}
};