import React from 'react';

const Navigation = ({ panels, activePanelIndex }) => {
	return (
		<nav className="flex items-center justify-center h-full">
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
	);
};

export default Navigation;
