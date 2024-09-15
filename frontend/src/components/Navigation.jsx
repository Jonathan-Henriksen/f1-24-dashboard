import React from 'react';

const Navigation = ({ panels, activePanelIndex }) => {
	return (
		<nav className="nav">
			<ul className="nav-list">
				{panels.map((panel, index) => (
					<li
						key={index}
						className={`nav-list-element ${index === activePanelIndex ? 'active' : ''}`}>
						{panel.name}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;
