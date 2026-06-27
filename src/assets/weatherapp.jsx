import { useState } from "react";
import SearchBox from "./SearchBox";
import Infobox from "./infobox";
import "./weatherapp.css";
import Forecast from "./Forecast";

// HD Unsplash background images per weather condition
const BG_IMAGES = {
  default: "/HD-Weather-Image.jpg",                    // local default
  hot:   "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=3840&q=100&auto=format&fit=crop", // vibrant sahara desert dunes
  rainy: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=3840&q=100&auto=format&fit=crop", // aesthetic rain on city window
  thunderstorm: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=3840&q=100&auto=format&fit=crop", // epic lightning strike 
  snow:  "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=3840&q=100&auto=format&fit=crop", // stunning snowy mountain ridges
  cold:  "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?w=3840&q=100&auto=format&fit=crop",  // deep winter frosty trees
  cloudy: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=3840&q=100&auto=format&fit=crop", // dramatic silver clouds
  clear: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=3840&q=100&auto=format&fit=crop",  // beautiful blue summer sky
};

function getBackground(info) {
  const { temp, humidity, weather } = info;
  const w = weather?.toLowerCase() || "";

  if (!weather) return BG_IMAGES.default;

  if (w.includes("thunderstorm")) return BG_IMAGES.thunderstorm;
  if (w.includes("snow") || temp < 2)  return BG_IMAGES.snow;
  if (humidity > 80 || w.includes("rain") || w.includes("drizzle")) return BG_IMAGES.rainy;
  if (w.includes("overcast") || w.includes("cloud")) return BG_IMAGES.cloudy;
  if (w.includes("clear") && temp > 30) return BG_IMAGES.hot;
  if (w.includes("clear") || w.includes("sunny")) return BG_IMAGES.clear;
  if (temp >= 30) return BG_IMAGES.hot;
  if (temp <= 10) return BG_IMAGES.cold;

  return BG_IMAGES.default;
}

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    current: {
      city: "Hello User 😎",
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

  const bgImage = getBackground(weatherInfo.current);

  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="app-card">
        <div className="app-title-row">
          <span className="app-title-icon">🌤️</span>
          <h1>Weather App</h1>
        </div>
        <SearchBox updateInfo={updateWeatherInfo} />
        <Infobox info={weatherInfo.current} />
        <Forecast forecast={weatherInfo.forecast} />
      </div>
    </div>
  );
}
