import React from 'react';
import './Navigation.css';

const Navigation = ({ panels, activePanelIndex }) => {
	return (
		<nav className="navigation-bar">
			<ul className="navigation-list">
				{panels.map((panel, index) => (
					<li
						key={index}
						className={`navigation-item ${index === activePanelIndex ? 'active' : ''}`}>
						{panel.name}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;
