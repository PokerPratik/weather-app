import { useState } from "react";
import SearchBox from "./SearchBox";
import Infobox from "./infobox";
import "./WeatherApp.css";

export default function WeatherApp() {
  const [wetherInfo, setWetherInfo] = useState({
    city: "Pune",
    feelsLike: 303.78,
    humidity: 17,
    temp: 306.01,
    tempMax: 306.01,
    tempMin: 303.37,
    weather: "Clouds",
  });

  let updateWeatherInfo = (newInfo) => {
    setWetherInfo(newInfo);
  };

  return (
    <div className="app-container">
      <div className="app-card">
        <h1>Weather App</h1>
        <SearchBox updateInfo={updateWeatherInfo} />
        <Infobox info={wetherInfo} />
      </div>
    </div>
  );
}
