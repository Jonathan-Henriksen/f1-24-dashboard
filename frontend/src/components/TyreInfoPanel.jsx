import React from "react";

const TyreInfoPanel = ({ panelData, teamName }) => {
	return (
		<div className="tyre-info-panel">
			<div className="temperature-grid-element front left"></div>
			<div className="temperature-grid-element front right"></div>
			<div className="car-image-grid-element"></div>
			<div className="temperature-grid-element rear left"></div>
			<div className="temperature-grid-element rear right"></div>
		</div>
	);
};

export default TyreInfoPanel;
