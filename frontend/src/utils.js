export const formatTime = (milliseconds, options = {}) => {
	if (milliseconds == null) { // Handle null or undefined input
		if (options.excludeMs) {
			return '0:00';
		}
		return '0:00.000';
	}

	const totalSeconds = Math.floor(milliseconds / 1000); // Convert to total seconds
	const ms = milliseconds % 1000; // Get remaining milliseconds
	const minutes = Math.floor(totalSeconds / 60); // Get full minutes
	const seconds = totalSeconds % 60; // Get remaining seconds

	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}${!options.excludeMs ? `.${ms.toString().padEnd(3, '0')}` : ''}`;
};

export function calculatePercentage(scaleStart, scaleEnd, value) {
	if (scaleEnd === scaleStart) {
		throw new Error("Scale start and end cannot be the same.");
	}
	return Math.trunc(((value - scaleStart) / (scaleEnd - scaleStart)) * 100);
}