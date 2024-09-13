// /frontend/src/services/api.js
import axios from 'axios';

// Dynamically determine the API base URL based on the current location
const API_URL = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`;

export const fetchMFDData = async () => {
	try {
		const response = await axios.get(`${API_URL}/mfd`);
		return response.data;
	} catch (error) {
		console.error("Error fetching MFD data", error);
		return null;
	}
};
