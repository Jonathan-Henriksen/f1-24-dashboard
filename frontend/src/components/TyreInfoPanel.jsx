// /components/TyreInfoPanel.jsx
import React from "react";
import './TyreInfoPanel.css';

const TyreInfoPanel = ({ data }) => {
	if (!data) return null;

	return (
		<div className="tyre-info-panel">
			<h2 className="tyre-info-title">Tyre Information</h2>
			<div className="tyre-compound">
				<span>Compound:</span> <span>{data.tyre_compound_visual}</span>
			</div>

			<div className="tyre-grid">
				<div className="tyre-item">
					<h3>Front Left Tyre</h3>
					<p>Temp (Carcass): {data.tyre_front_left.temperature_carcass}°C</p>
					<p>Pressure: {data.tyre_front_left.pressure_psi} psi</p>
					<p>Wear: {(data.tyre_front_left.wear_percentage * 100).toFixed(2)}%</p>
				</div>
				<div className="tyre-item">
					<h3>Front Right Tyre</h3>
					<p>Temp (Carcass): {data.tyre_front_right.temperature_carcass}°C</p>
					<p>Pressure: {data.tyre_front_right.pressure_psi} psi</p>
					<p>Wear: {(data.tyre_front_right.wear_percentage * 100).toFixed(2)}%</p>
				</div>
				<div className="tyre-item">
					<h3>Rear Left Tyre</h3>
					<p>Temp (Carcass): {data.tyre_rear_left.temperature_carcass}°C</p>
					<p>Pressure: {data.tyre_rear_left.pressure_psi} psi</p>
					<p>Wear: {(data.tyre_rear_left.wear_percentage * 100).toFixed(2)}%</p>
				</div>
				<div className="tyre-item">
					<h3>Rear Right Tyre</h3>
					<p>Temp (Carcass): {data.tyre_rear_right.temperature_carcass}°C</p>
					<p>Pressure: {data.tyre_rear_right.pressure_psi} psi</p>
					<p>Wear: {(data.tyre_rear_right.wear_percentage * 100).toFixed(2)}%</p>
				</div>
			</div>
		</div>
	);
};

export default TyreInfoPanel;
