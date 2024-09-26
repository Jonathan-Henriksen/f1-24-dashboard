const hexToRgb = (hex) => {
	hex = hex.replace(/^#/, '');
	let bigint = parseInt(hex, 16);
	let r = (bigint >> 16) & 255;
	let g = (bigint >> 8) & 255;
	let b = bigint & 255;
	return [r, g, b];
};

const rgbToHex = (r, g, b) => {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const blendColors = (color1, color2, percentage) => {
	let rgb1 = hexToRgb(color1);
	let rgb2 = hexToRgb(color2);

	let r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * (percentage / 100));
	let g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * (percentage / 100));
	let b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * (percentage / 100));

	return rgbToHex(r, g, b);
};


/**
 * Function to return a gradient color based on the colorRange and a value
 * @param {string} colorRange - The range of colors and their correponding breakpoints - [ { color: 'green' value: 0 }, { color: 'red', value: 100 }]
 * @returns {string} - Color code for input value, based on its location in the color range.
 */
export const getColorFromList = (colorRange, value) => {
	colorRange.sort((a, b) => a.value - b.value);

	let lowerColor, upperColor;
	for (let i = 0; i < colorRange.length - 1; i++) {
		if (value >= colorRange[i].value && value <= colorRange[i + 1].value) {
			lowerColor = colorRange[i];
			upperColor = colorRange[i + 1];
			break;
		}
	}

	if (!lowerColor) return colorRange[0].color;

	if (!upperColor) return colorRange[colorRange.length - 1].color;

	const range = upperColor.value - lowerColor.value;
	const positionInRange = value - lowerColor.value;
	const percentage = (positionInRange / range) * 100;

	return blendColors(lowerColor.color, upperColor.color, percentage);
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
		case 'RB': return 'text-rb';
		case 'HAAS': return 'text-haas';
		case 'MCLAREN': return 'text-mclaren';
		case 'SAUBER': return 'text-sauber';
		default: return 'text-white';
	}
};