/**
 * Format time object into a string (mm:ss.ms)
 * @param {object} timeObj - Object containing minutes, seconds, and milliseconds
 * @returns {string} - Formatted time string
 */
export const formatTime = (timeObj, options = {}) => {
	if (!timeObj) {
		if (options.excludeMs)
			return '0:00'

		return '0:00.000'
	}

	const { minutes, seconds, ms } = timeObj;
	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}${!options.excludeMs ? `.${ms.toString().padEnd(3, '0')}` : ''}`;
};

/**
 * Get image URL for a car based on team name
 * @param {string} teamName - Name of the team
 * @returns {string} - URL path to the car image
 */
export const getCarImage = (teamName) => {
	if (!teamName) {
		teamName = 'red_bull_racing'
	}

	return `/images/cars/${teamName.toLowerCase()}.png`;
};

export const getCarTopViewImage = (teamName) => {
	return `/images/carTopView/${teamName.toLowerCase()}.png`;
};

export const getTyreCompoundImage = (compoundVisual) => {
	return `/images/carTopView/${compoundVisual.toLowerCase()}.png`
}


// Helper function to capitalize driver names properly
export const capitalizeName = (name) => {
	return name.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
};

/**
 * Function to map team names to their Tailwind text color class
 * @param {string} team - The name of the team (e.g., 'MERCEDES', 'FERRARI', 'RED_BULL_RACING', etc.)
 * @returns {string} - The Tailwind color class for the team's color
 */
export const getTeamColor = (team) => {
	switch (team.toUpperCase()) {
		case 'MERCEDES': return 'text-mercedes';
		case 'FERRARI': return 'text-ferrari';
		case 'RED_BULL_RACING': return 'text-redbull';
		case 'WILLIAMS': return 'text-williams';
		case 'ASTON_MARTIN': return 'text-astonmartin';
		case 'ALPINE': return 'text-alpine';
		case 'RB': return 'text-rb'; // RB (previously AlphaTauri)
		case 'HAAS': return 'text-haas';
		case 'MCLAREN': return 'text-mclaren';
		case 'SAUBER': return 'text-sauber'; // Sauber (previously Alfa Romeo)
		default: return 'text-white'; // Default to white if no matching team
	}
};

export function calculatePercentage(scaleStart, scaleEnd, value) {
	if (scaleEnd === scaleStart) {
		throw new Error("Scale start and end cannot be the same.");
	}
	return Math.trunc(((value - scaleStart) / (scaleEnd - scaleStart)) * 100);
}