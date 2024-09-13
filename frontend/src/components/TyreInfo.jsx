import React from "react";
import "./TyreInfo.css";

const positionClass = {
	"front-left": "tyre-front-left",
	"front-right": "tyre-front-right",
	"rear-left": "tyre-rear-left",
	"rear-right": "tyre-rear-right",
};

const TyreInfo = ({ tyre, position }) => {
	return (
		<div className={`${positionClass[position]} tyre-info`}>
			<div>Pressure: {tyre.pressure_psi} psi</div>
			<div>Wear: {tyre.wear_percentage}%</div>
			<div>Temp: {tyre.temperature_surface}°C (surface)</div>
			<div>Temp: {tyre.temperature_carcass}°C (carcass)</div>
		</div>
	);
};

export default TyreInfo;
