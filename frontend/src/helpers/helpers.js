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