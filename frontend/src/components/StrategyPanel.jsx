// /components/StrategyPanel.jsx
import React from "react";
import './StrategyPanel.css';
const StrategyPanel = ({ data }) => {
	if (!data) return null;

	// Group tyre sets by compound
	const tyreSetGroups = data.tyre_sets_available.reduce((acc, tyre) => {
		const compound = tyre.tyre_compund_visual;
		acc[compound] = (acc[compound] || 0) + 1; // Count each compound type
		return acc;
	}, {});

	return (
		<div className="strategy-panel">
			<h2 className="strategy-title">Race Strategy</h2>

			{/* Section 1: Pit Information */}
			<div className="strategy-section">
				<h3 className="section-title">Pit Information</h3>
				<div className="strategy-item">
					<span>Recommended Pit Lap:</span> <span>{data.lap_to_pit_recommended}</span>
				</div>
				<div className="strategy-item">
					<span>Latest Pit Lap:</span> <span>{data.lap_to_pit_latest}</span>
				</div>
				<div className="strategy-item">
					<span>Expected Rejoin Position:</span> <span>{data.expected_rejoin_position}</span>
				</div>
			</div>

			{/* Section 2: Tyre Information */}
			<div className="strategy-section tyre-info-section">
				<h3 className="section-title">Current Tyre Status</h3>
				<div className="strategy-item">
					<span>Current Tyre Wear:</span> <span>{(data.tyre_sets_current_wear_percentage)}%</span>
				</div>
				<div className="strategy-item">
					<span>Current Laps Left:</span> <span>{data.tyre_sets_current_laps_left}</span>
				</div>
				<div className="strategy-item">
					<span>Max Laps for Compound:</span> <span>{data.tyre_sets_current_compound_laps_max}</span>
				</div>
			</div>

			{/* Section 3: Available Tyre Sets */}
			<div className="strategy-section tyre-sets-section">
				<h3 className="section-title">Available Tyre Sets</h3>
				<div className="tyre-sets-group">
					{Object.entries(tyreSetGroups).map(([compound, count]) => (
						<div key={compound} className="tyre-set-item">
							<span>{count} x</span> <span>{compound}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default StrategyPanel;
