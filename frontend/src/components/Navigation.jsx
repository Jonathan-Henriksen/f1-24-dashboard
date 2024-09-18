import React from 'react';

const Navigation = ({ panels, activePanelIndex }) => {
	return (
		<nav className="flex flex-row justify-stretch items-stretch rounded-xl shadow-lg border-2 overflow-hidden bg-mainLight/95  border-mainBorder/25">
			<ul className="flex justify-between divide-x w-full py-4 divide-mainWhite/50">
				{panels.map((panel, index) => (
					<li
						key={index}
						className={`grow text-center text-3xl uppercase tracking-wider relative ${index === activePanelIndex ? 'text-mainRed/90' : 'text-mainWhite/95'}`}>
						{panel.name}
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;
