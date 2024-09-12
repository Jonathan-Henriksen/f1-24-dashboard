/**
 * Format time object into a string (mm:ss.ms)
 * @param {object} timeObj - Object containing minutes, seconds, and milliseconds
 * @returns {string} - Formatted time string
 */
export const formatTime = (timeObj) => {
	const { minutes, seconds, ms } = timeObj;
	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${ms}`;
};

/**
 * Get image URL for a car based on team name
 * @param {string} teamName - Name of the team
 * @returns {string} - URL path to the car image
 */
export const getCarImage = (teamName) => {
	return `/images/cars/${teamName.toLowerCase()}.png`;
};

// Helper function to capitalize driver names properly
const capitalizeName = (name) => {
	return name.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
};