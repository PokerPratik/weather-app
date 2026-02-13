import { useState } from "react";
import SearchBox from "./SearchBox";
import Infobox from "./infobox";
import "./WeatherApp.css";
import Forecast from "./Forecast";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    current: {
      city: "Hello User😎",
      feelsLike: 0,
      humidity: 0,
      temp: 0,
      tempMax: 0,
      tempMin: 0,
      weather: "",
    },
    forecast: [],
  });

  let updateWeatherInfo = (newInfo, forecastData) => {
    setWeatherInfo({
      current: newInfo,
      forecast: forecastData,
    });
  };

  return (
    <div className="app-container">
      <div className="app-card">
        <h1>Weather App</h1>
        <SearchBox updateInfo={updateWeatherInfo} />
        <Infobox info={weatherInfo.current} />
        <Forecast forecast={weatherInfo.forecast} />
      </div>
    </div>
  );
}
