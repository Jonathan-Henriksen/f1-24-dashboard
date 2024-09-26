import React from "react";

const Card = ({ children, flex = "flex justify-center justify-items-center items-center" }) => (
	<div className={`${flex} p-4 border-2 rounded-xl shadow-xl bg-mainDark/50 border-mainBorder/25 shadow-mainDark/50`}>
		{children}
	</div>
)

export default Card