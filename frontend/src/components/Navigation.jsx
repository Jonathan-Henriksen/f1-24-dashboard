import React from 'react';

const Navigation = ({ panels, activePanelIndex }) => {
	return (
		<div class="nav-container">
			<nav className="flex items-center justify-center h-1/6 shadow-lg rounded-lg mx-8 mb-4">
				<ul className="flex justify-between w-full">
					{panels.map((panel, index) => (
						<li
							key={index}
							className={`text-2xl uppercase tracking-wider cursor-pointer flex-grow text-center relative ${index === activePanelIndex ? 'text-f1Highlight font-bold' : ''}`}>
							{panel.name}
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default Navigation;
