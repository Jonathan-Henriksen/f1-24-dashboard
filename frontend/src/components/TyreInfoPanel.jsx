import React from "react";
import TyreInfoHeader from "./TyreInfoHeader";
import TyreInfo from "./TyreInfo";
import { getCarTopViewImage } from "helpers/helpers";
import "./TyreInfoPanel.css";

const TyreInfoPanel = ({ data, teamName }) => {
	return (
		<div className="tyre-info-panel">
			{/* General Info (Top Row) */}
			<TyreInfoHeader
				compound={data.tyre_compound_visual}
				wearPercentage={data.tyre_set_total_wear_percentage}
			/>

			{/* Car Image with Tyre Details (Bottom Row) */}
			<div className="car-container">
				<img src={getCarTopViewImage(teamName)} alt="Car top view" className="car-image" />

				{/* Tyre Details rendered in respective positions */}
				<TyreInfo tyre={data.tyre_front_left} position="front-left" />
				<TyreInfo tyre={data.tyre_front_right} position="front-right" />
				<TyreInfo tyre={data.tyre_rear_left} position="rear-left" />
				<TyreInfo tyre={data.tyre_rear_right} position="rear-right" />
			</div>
		</div>
	);
};

export default TyreInfoPanel;
