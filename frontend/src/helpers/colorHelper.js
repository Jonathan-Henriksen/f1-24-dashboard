// Helper function to convert hex to RGB
const hexToRgb = (hex) => {
	hex = hex.replace(/^#/, '');
	let bigint = parseInt(hex, 16);
	let r = (bigint >> 16) & 255;
	let g = (bigint >> 8) & 255;
	let b = bigint & 255;
	return [r, g, b];
};

// Helper function to convert RGB back to hex
const rgbToHex = (r, g, b) => {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

// Function to interpolate between two colors
const blendColors = (color1, color2, percentage) => {
	let rgb1 = hexToRgb(color1);
	let rgb2 = hexToRgb(color2);

	let r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * (percentage / 100));
	let g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * (percentage / 100));
	let b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * (percentage / 100));

	return rgbToHex(r, g, b);
};

// Updated function to handle color-value pairs
export const getColorFromList = (colorRange, value) => {
	// Sort the color range based on the value
	colorRange.sort((a, b) => a.value - b.value);

	// Find the two color stops the value falls between
	let lowerColor, upperColor;
	for (let i = 0; i < colorRange.length - 1; i++) {
		if (value >= colorRange[i].value && value <= colorRange[i + 1].value) {
			lowerColor = colorRange[i];
			upperColor = colorRange[i + 1];
			break;
		}
	}

	// If value is below the lowest value, return the lowest color
	if (!lowerColor) return colorRange[0].color;

	// If value is above the highest value, return the highest color
	if (!upperColor) return colorRange[colorRange.length - 1].color;

	// Calculate the interpolation percentage between lowerColor and upperColor
	const range = upperColor.value - lowerColor.value;
	const positionInRange = value - lowerColor.value;
	const percentage = (positionInRange / range) * 100;

	// Interpolate the color based on the percentage
	return blendColors(lowerColor.color, upperColor.color, percentage);
};