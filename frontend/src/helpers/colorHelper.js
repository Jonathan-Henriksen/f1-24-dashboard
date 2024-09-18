function hexToRgb(hex) {
	hex = hex.replace(/^#/, '');
	let bigint = parseInt(hex, 16);
	let r = (bigint >> 16) & 255;
	let g = (bigint >> 8) & 255;
	let b = bigint & 255;
	return [r, g, b];
}

function rgbToHex(r, g, b) {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function blendColors(color1, color2, percentage) {
	let rgb1 = hexToRgb(color1);
	let rgb2 = hexToRgb(color2);

	let r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * (percentage / 100));
	let g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * (percentage / 100));
	let b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * (percentage / 100));

	return rgbToHex(r, g, b);
}

export function getColorFromList(colorList, percentage) {
	if (percentage <= 0) return colorList[0];
	if (percentage >= 100) return colorList[colorList.length - 1];

	let numColors = colorList.length;
	let segmentSize = 100 / (numColors - 1);

	// Determine which two colors to blend
	let segmentIndex = Math.floor(percentage / segmentSize);
	let segmentPercentage = (percentage % segmentSize) / segmentSize * 100;

	return blendColors(colorList[segmentIndex], colorList[segmentIndex + 1], segmentPercentage);
}