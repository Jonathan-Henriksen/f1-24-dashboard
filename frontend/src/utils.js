export const formatTime = (timeObj, options = {}) => {
	if (!timeObj) {
		if (options.excludeMs)
			return '0:00'

		return '0:00.000'
	}

	const { minutes, seconds, ms } = timeObj;
	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}${!options.excludeMs ? `.${ms.toString().padEnd(3, '0')}` : ''}`;
};

export function calculatePercentage(scaleStart, scaleEnd, value) {
	if (scaleEnd === scaleStart) {
		throw new Error("Scale start and end cannot be the same.");
	}
	return Math.trunc(((value - scaleStart) / (scaleEnd - scaleStart)) * 100);
}

const API_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`;
export const fetchLatestSessionId = async () => {
	try {
		const response = await axios.get(`${API_URL}:5000/sessions/latestId`);
		return response.data;
	} catch (error) {
		console.error("Error fetching MFD data", error);
		return null;
	}
};

export const fetchSessionData = async (sessionId) => {
	try {
		const response = await axios.get(`${API_URL}:5000/sessions/${sessionId}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching MFD data", error);
		return null;
	}
};