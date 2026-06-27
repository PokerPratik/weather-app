import "./Forecast.css";

const weatherIcons = {
  clear: "☀️",
  clouds: "☁️",
  rain: "🌧️",
  snow: "❄️",
  thunderstorm: "⛈️",
  drizzle: "🌦️",
  mist: "🌫️",
  default: "🌡️",
};

export default function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="forecast-section">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecast.map((day, index) => {
          const date = new Date(day.date);
          const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
          const monthDay = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          const icon = weatherIcons[day.weather?.toLowerCase()] || weatherIcons.default;

          return (
            <div className="forecast-card" key={index}>
              <div className="forecast-day">{weekday}</div>
              <div className="forecast-date">{monthDay}</div>
              <div className="forecast-icon">{icon}</div>
              <div className="forecast-temp">{Math.round(day.temp)}°C</div>
              <div className="forecast-label">{day.weather}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
