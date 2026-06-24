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
        {/* <div className="project-info">
          <p>
            <strong>Language:</strong> JavaScript
          </p>
          <p>
            <strong>Library:</strong> React + Material UI
          </p>
          <p>
            <strong>Purpose:</strong> A simple weather app that lets users
            search any city and view live weather information.
          </p>
          <p>
            <strong>Features:</strong> City search, current temperature,
            humidity, feels-like temperature, min/max temperature, weather
            condition, and a 5-day forecast.
          </p>
          <p>
            <strong>API Used:</strong> OpenWeather API for current weather and
            forecast data.
          </p>
          <p>
            <strong>UI Design:</strong> Responsive card layout with Material UI
            components and mobile-friendly styling.
          </p>
          <p>
            <strong>User Experience:</strong> Instant search results with error
            handling for invalid city names.
          </p>
        </div> */}
        <SearchBox updateInfo={updateWeatherInfo} />
        <Infobox info={weatherInfo.current} />
        <Forecast forecast={weatherInfo.forecast} />
      </div>
    </div>
  );
}
