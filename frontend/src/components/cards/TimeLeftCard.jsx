import { formatTime } from "utils";
import React from "react";
import Card from "./Card";

const TimeLeftCard = ({ seconds }) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;

	return (
		<Card flex="flex flex-auto flex-col basis-1/6 place-content-center h-full min-h-32 max-h-44">
			<span className="text-center text-4xl font-bold tracking-wide text-mainWhite/80">Time Left</span>
			<span className={`text-center text-6xl font-semibold tracking-wide ${minutes < 2 ? 'text-mainRed' : ''}`}>{formatTime({ minutes: minutes, seconds: remainingSeconds, ms: 0 }, { excludeMs: true })}</span>
		</Card>
	)
}

export default TimeLeftCard