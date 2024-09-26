import React from "react";

const StrategyCard = ({ recommendedLapToPit, latestLapToPit, expectedRejoinPosition }) => (
	<Card flex="flex-col justify-center divide-y-2 divide-mainBorder/50">

		<div className="flex flex-col items-center">
			<span className="text-center text-3xl">Recommended Lap to Pit</span>
			<span className="text-center text-4xl font-semibold">Lap{recommendedLapToPit}</span>
		</div>

		<div className="flex flex-col items-center">
			<span className="text-center text-3xl">Latest Lap to Pit</span>
			<span className="text-center text-4xl font-semibold">Lap {latestLapToPit}</span>
		</div>

		<div className="flex flex-col items-center">
			<span className="text-center text-3xl">Expected Rejoin Position</span>
			<span className="text-center text-4xl font-semibold">P{expectedRejoinPosition}</span>
		</div>

	</Card>
)

export default StrategyCard