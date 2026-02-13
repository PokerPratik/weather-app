import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
  const API_KEY = "86d78382cc2e400ffd42f3072774755a";

  // 🔹 Get Current Weather
  let getWeather = async () => {
    let response = await fetch(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`,
    );

    let jsonResponse = await response.json();

    if (!response.ok) {
      throw new Error("City not found");
    }

    let result = {
      city: city,
      temp: jsonResponse.main.temp,
      tempMin: jsonResponse.main.temp_min,
      tempMax: jsonResponse.main.temp_max,
      humidity: jsonResponse.main.humidity,
      feelsLike: jsonResponse.main.feels_like,
      weather: jsonResponse.weather[0].description,
    };

    return result;
  };

  // 🔹 Get Forecast (OUTSIDE getWeather)
  let getForecast = async () => {
    let response = await fetch(
      `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`,
    );

    let jsonResponse = await response.json();

    if (!response.ok) {
      throw new Error("Forecast not found");
    }

    let dailyData = jsonResponse.list.filter((item) =>
      item.dt_txt.includes("12:00:00"),
    );

    let forecastResult = dailyData.slice(0, 5).map((item) => ({
      date: item.dt_txt,
      temp: item.main.temp,
      weather: item.weather[0].main,
    }));

    return forecastResult;
  };

  let handleChange = (event) => {
    setCity(event.target.value);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let newInfo = await getWeather();
      let forecastData = await getForecast();

      updateInfo(newInfo, forecastData);

      setError(false);
      setCity("");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        />

        <br />
        <br />

        <Button variant="contained" type="submit">
          Search
        </Button>

        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>City not found!</p>
        )}
      </form>
    </div>
  );
}
