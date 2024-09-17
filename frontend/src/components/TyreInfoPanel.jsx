import React from "react";

const TyreInfoPanel = ({ panelData, teamName }) => {
	return (
		<div className="tyre-info-panel">
			<div className="tyre-info-temps front left"></div>
			<div className="tyre-info-temps front right"></div>
			<div className="tyre-info-car-image-container"></div>
			<div className="tyre-info-temps rear right"></div>
			<div className="tyre-info-temps rear right"></div>
		</div>
	);
};

export default TyreInfoPanel;
