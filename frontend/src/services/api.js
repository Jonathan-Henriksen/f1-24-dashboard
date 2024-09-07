// /frontend/src/services/api.js
import axios from 'axios';

const API_URL = "http://192.168.86.230:5000/api";

export const fetchMFDData = async () => {
	try {
		const response = await axios.get(`${API_URL}/mfd`);
		return response.data;
	} catch (error) {
		console.error("Error fetching MFD data", error);
		return null;
	}
};