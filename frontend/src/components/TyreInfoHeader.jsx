import React from "react";
import WearBar from "./WearBar";
import { getTyreCompoundImage } from "helpers/helpers";
import "./TyreInfoHeader.css";

const TyreInfoHeader = ({ compound, wearPercentage }) => {
	return (
		<div className="tyre-info-header">
			<div className="compound-display">
				<img src={getTyreCompoundImage(compound)} alt={`${compound} icon`} className="compound-icon" />
				<span className="compound-text">{compound} Compound</span>
			</div>
			<div className="wear-bar-container">
				<WearBar percentage={wearPercentage} />
			</div>
		</div>
	);
};

export default TyreInfoHeader;
