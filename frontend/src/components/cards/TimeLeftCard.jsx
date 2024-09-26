import { formatTime } from "utils";
import React from "react";

const TimeLeftCard = ({ time }) => (
	<Card flex="flex flex-col justify-center">
		<span className="text-center text-3xl font-semibold tracking-wide">Time Left</span>
		<span className={`text-center text-5xl font-semibold tracking-wide ${time.minutes < 2 ? 'text-mainRed' : ''}`}>{formatTime(time, { excludeMs: true })}</span>
	</Card>
)

export default TimeLeftCard