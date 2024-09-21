import { ReactComponent as Clear } from "../icons/weather/clear_day.svg";
import { ReactComponent as LightCloud } from "../icons/weather/light_cloud_day.svg";
import { ReactComponent as Overcast } from "../icons/weather/overcast_day.svg";
import { ReactComponent as LightRain } from "../icons/weather/light_rain_day.svg";
import { ReactComponent as HeavyRain } from "../icons/weather/heavy_rain_day.svg";

import { ReactComponent as ClearNight } from "../icons/weather/clear_night.svg";
import { ReactComponent as LightCloudNight } from "../icons/weather/light_cloud_night.svg";
import { ReactComponent as OvercastNight } from "../icons/weather/overcast_night.svg";
import { ReactComponent as LightRainNight } from "../icons/weather/light_rain_night.svg";
import { ReactComponent as HeavyRainNight } from "../icons/weather/heavy_rain_night.svg";

const WeatherIcon = (weather, isDay = true) => {
	console.log(weather)
	switch (weather) {
		case "CLEAR":
			return isDay ? Clear : ClearNight;
		case "LIGHT_CLOUD":
			return isDay ? LightCloud : LightCloudNight;
		case "OVERCAST":
			return isDay ? Overcast : OvercastNight;
		case "LIGHT_RAIN":
			return isDay ? LightRain : LightRainNight;
		case "HEAVY_RAIN":
			return isDay ? HeavyRain : HeavyRainNight;
		default:
			return isDay ? Clear : ClearNight;
	}
}

export default WeatherIcon;