import React from 'react';
import './LeaderboardPanel.css'; // Custom CSS for specific elements like colors and images

function LeaderboardPanel({ drivers }) {
	return (
		<div className="leaderboard-panel">
			<div className="leaderboard-columns">
				<table className="leaderboard-table">
					<thead>
						<tr>
							<th>Pos</th>
							<th>Driver</th>
							<th>Team</th>
							<th>Time/Gap</th>
							<th>Delta</th>
							<th>Tyre</th>
						</tr>
					</thead>
					<tbody>
						{drivers.map((driver, index) => (
							<tr key={index} className={driver.isPlayer ? 'highlight-player' : ''}>
								<td>{driver.position}</td>
								<td>{driver.name}</td>
								<td>{driver.team}</td>
								<td>{driver.timeGap}</td>
								<td className={driver.delta > 0 ? 'delta-red' : 'delta-green'}>
									{driver.delta > 0 ? `+${driver.delta}` : driver.delta}
								</td>
								<td>
									<img src={driver.tyreImage} alt="Tyre" className="tyre-svg" />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default LeaderboardPanel;
