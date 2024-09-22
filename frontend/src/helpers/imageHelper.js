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
	return `/images/tyres/${compoundVisual.toLowerCase()}.png`
}