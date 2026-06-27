import { useState } from "react";
import "./SearchBox.css";

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
  const API_KEY = "86d78382cc2e400ffd42f3072774755a";

  // 1. Convert City Name to Exact GPS Coordinates (Open-Meteo is much more accurate)
  let getCoordinates = async (cityName) => {
    let geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`
    );
    let geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found");
    }

    let result = geoData.results[0];
    return {
      lat: result.latitude,
      lon: result.longitude,
      name: `${result.name}${result.country_code ? `, ${result.country_code}` : ""}`,
      timezone: result.timezone // e.g., "Asia/Kolkata" or "Europe/London"
    };
  };

  // 2. Get Weather via exact coordinates
  let getWeather = async (lat, lon, resolvedName, timezone) => {
    let response = await fetch(
      `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    let jsonResponse = await response.json();
    if (!response.ok) throw new Error("Weather data not found");

    return {
      city: resolvedName,
      timezone: timezone,
      temp: jsonResponse.main.temp,
      tempMin: jsonResponse.main.temp_min,
      tempMax: jsonResponse.main.temp_max,
      humidity: jsonResponse.main.humidity,
      feelsLike: jsonResponse.main.feels_like,
      weather: jsonResponse.weather[0].description,
    };
  };

  // 3. Get Forecast via exact coordinates
  let getForecast = async (lat, lon) => {
    let response = await fetch(
      `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    let jsonResponse = await response.json();
    if (!response.ok) throw new Error("Forecast not found");

    let dailyData = jsonResponse.list.filter((item) =>
      item.dt_txt.includes("12:00:00"),
    );

    return dailyData.slice(0, 5).map((item) => ({
      date: item.dt_txt,
      temp: item.main.temp,
      weather: item.weather[0].main,
    }));
  };

  let handleChange = (event) => {
    setCity(event.target.value);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Step A: Geocode city text to precise latitude/longitude
      let coords = await getCoordinates(city);
      
      // Step B: Fetch weather and forecast using exact GPS points
      let newInfo = await getWeather(coords.lat, coords.lon, coords.name, coords.timezone);
      let forecastData = await getForecast(coords.lat, coords.lon);

      updateInfo(newInfo, forecastData);
      setError(false);
      setCity("");
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="SearchBox">
      <form className="search-form" onSubmit={handleSubmit}>
        <span style={{ fontSize: "20px" }}>🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search city (e.g. Mumbai, London…)"
          required
          value={city}
          onChange={handleChange}
        />
        <button className="search-btn" type="submit" disabled={loading}>
          {loading ? "⏳ Loading…" : "Search"}
        </button>
      </form>
      {error && (
        <p className="search-error">
          ⚠️ City not found. Please try again.
        </p>
      )}
    </div>
  );
}
