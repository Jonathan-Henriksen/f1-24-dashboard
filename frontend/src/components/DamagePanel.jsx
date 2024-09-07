import React from "react";
import './DamagePanel.css';

const DamagePanel = ({ data }) => {
	if (!data) return null;

	// Function to calculate the color based on the percentage of damage
	const getColorByDamage = (damage) => {
		const red = Math.min(255, Math.floor((damage / 100) * 255)); // Increase red as damage increases
		const green = Math.min(255, Math.floor(((100 - damage) / 100) * 255)); // Decrease green as damage increases
		return `rgb(${red}, ${green}, 0)`; // Return color in RGB format
	};

	return (
		<div className="damage-panel">
			<h2 className="damage-title">Car Damage Overview</h2>
			<div className="damage-grid">
				<div className="damage-item" style={{ color: getColorByDamage(data.wing_front_left) }}>
					<span>Front Left Wing</span>
					<span>{data.wing_front_left}%</span>
				</div>
				<div className="damage-item" style={{ color: getColorByDamage(data.wing_front_right) }}>
					<span>Front Right Wing</span>
					<span>{data.wing_front_right}%</span>
				</div>
				<div className="damage-item" style={{ color: getColorByDamage(data.wing_rear) }}>
					<span>Rear Wing</span>
					<span>{data.wing_rear}%</span>
				</div>
				<div className="damage-item" style={{ color: getColorByDamage(data.floor) }}>
					<span>Floor</span>
					<span>{data.floor}%</span>
				</div>
				<div className="damage-item" style={{ color: getColorByDamage(data.diffuser) }}>
					<span>Diffuser</span>
					<span>{data.diffuser}%</span>
				</div>
				<div className="damage-item" style={{ color: getColorByDamage(data.sidepod) }}>
					<span>Sidepod</span>
					<span>{data.sidepod}%</span>
				</div>
				<div className="damage-item" style={{ color: getColorByDamage(data.gearbox) }}>
					<span>Gearbox</span>
					<span>{data.gearbox}%</span>
				</div>
				<div className="damage-item" style={{ color: getColorByDamage(data.engine) }}>
					<span>Engine</span>
					<span>{data.engine}%</span>
				</div>
			</div>

			{/* Display ERS alert if there's an ERS fault */}
			{data.ers_fault && (
				<div className="ers-alert">
					ERS Fault Detected!
				</div>
			)}
		</div>
	);
};

export default DamagePanel;
