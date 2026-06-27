import { useState, useEffect } from "react";
import "./infobox.css";

const HOT_URL = "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=3840&q=100&auto=format&fit=crop";
const COLD_URL = "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?w=3840&q=100&auto=format&fit=crop";
const RAINY_URL = "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=3840&q=100&auto=format&fit=crop";
const SNOW_URL = "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=3840&q=100&auto=format&fit=crop";
const THUNDER_URL = "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=3840&q=100&auto=format&fit=crop";
const CLOUDY_URL = "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=3840&q=100&auto=format&fit=crop";
const CLEAR_URL = "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=3840&q=100&auto=format&fit=crop";
const INIT_URL = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=3840&q=100&auto=format&fit=crop";

export default function Infobox({ info }) {
  const isDefault = !info.weather;
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  let formattedTime = "";
  let formattedDate = "";
  
  try {
    const formatOptionsTime = { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      timeZone: info.timezone || undefined
    };
    
    const formatOptionsDate = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric',
      timeZone: info.timezone || undefined 
    };

    formattedTime = time.toLocaleTimeString([], formatOptionsTime);
    formattedDate = time.toLocaleDateString([], formatOptionsDate);
  } catch(e) {
    // Fallback if timezone string is invalid/unknown
    formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    formattedDate = time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }

  const getImage = () => {
    if (isDefault) return INIT_URL;

    const w = info.weather.toLowerCase();
    const temp = info.temp;
    const humidity = info.humidity;

    if (w.includes("thunderstorm")) return THUNDER_URL;
    if (w.includes("snow") || temp < 2) return SNOW_URL;
    if (humidity > 80 || w.includes("rain") || w.includes("drizzle")) return RAINY_URL;
    if (w.includes("overcast") || w.includes("cloud")) return CLOUDY_URL;
    if (w.includes("clear") && temp > 30) return HOT_URL;
    if (w.includes("clear") || w.includes("sunny")) return CLEAR_URL;
    if (temp >= 30) return HOT_URL;
    if (temp <= 10) return COLD_URL;

    return CLEAR_URL;
  };

  const stats = [
    { icon: "🌡️", label: "Feels Like", value: `${Math.round(info.feelsLike)}°C` },
    { icon: "💧", label: "Humidity", value: `${info.humidity}%` },
    { icon: "🌬️", label: "Min Temp", value: `${Math.round(info.tempMin)}°C` },
    { icon: "🔆", label: "Max Temp", value: `${Math.round(info.tempMax)}°C` },
    { icon: "🌤️", label: "Condition", value: info.weather || "—" },
    { icon: "📍", label: "City", value: info.city || "—" },
  ];

  return (
    <div className="Infobox">
      {/* Hero image with overlay */}
      <div className="weather-hero">
        <img
          className="weather-hero-img"
          src={getImage()}
          alt="weather"
        />
        <div className="weather-hero-overlay" />
        
        {/* Floating Live Clock */}
        <div className="live-clock">
          <div className="clock-time">{formattedTime}</div>
          <div className="clock-date">{formattedDate}</div>
        </div>

        <div className="weather-hero-content">
          <div>
            <div className="weather-city">{info.city}</div>
            <div 
              className="weather-condition" 
              style={{ textTransform: isDefault ? 'none' : 'capitalize' }}
            >
              {info.weather || "Search a city to get started"}
            </div>
          </div>
          {!isDefault && (
            <div className="weather-temp-big">
              {Math.round(info.temp)}°
            </div>
          )}
        </div>
      </div>

      {/* Stats grid */}
      {!isDefault && (
        <div className="weather-stats">
          {stats.slice(0, 5).map((s, i) => (
            <div className="stat-card" key={i}>
              <span className="stat-icon">{s.icon}</span>
              <span className="stat-label">{s.label}</span>
              <span className="stat-value">{s.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
