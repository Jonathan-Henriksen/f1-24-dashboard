import React from "react";
import Card from "./Card";

const SettingsCard = ({ ersDeployMode, brakeBias, differential }) => (
	<Card flex="flex items-center">

		<div className="flex flex-col p-2 gap-2">
			<span className="text-3xl font-semibold tracking-wide">ERS Mode</span>
			<span className="text-3xl font-semibold tracking-wide">Brake Bias</span>
			<span className="text-3xl font-semibold tracking-wide">Differential</span>
		</div>

		<div className="flex flex-col p-2 gap-2">
			<span className="text-3xl tracking-wide capitalize">{ersDeployMode.toLowerCase()}</span>
			<span className="text-3xl tracking-wide">{brakeBias}%</span>
			<span className="text-3xl tracking-wide">{differential}%</span>
		</div>

	</Card>
)

export default SettingsCard