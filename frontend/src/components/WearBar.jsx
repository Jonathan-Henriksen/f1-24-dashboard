import React from "react";
import "./WearBar.css";

const WearBar = ({ percentage }) => {
	const getBarColor = () => {
		if (percentage < 40) return "wear-bar-green";
		if (percentage < 70) return "wear-bar-yellow";
		return "wear-bar-red";
	};

	return (
		<div className="wear-bar-background">
			<div className={`wear-bar-fill ${getBarColor()}`} style={{ width: `${percentage}%` }}></div>
		</div>
	);
};

export default WearBar;
