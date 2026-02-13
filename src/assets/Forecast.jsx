export default function Forecast({ forecast }) {
  const getWeatherIcon = (weather) => {
    switch (weather?.toLowerCase()) {
      case "clear":
        return "☀️";
      case "clouds":
        return "☁️";
      case "rain":
        return "🌧";
      case "snow":
        return "❄️";
      case "thunderstorm":
        return "⛈";
      default:
        return "🌡";
    }
  };

  if (!forecast || forecast.length === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        marginTop: "20px",
        overflowX: "auto",
      }}
    >
      {forecast.map((day, index) => {
        const date = new Date(day.date);
        const weekday = date.toLocaleDateString("en-US", {
          weekday: "long",
        });

        return (
          <div
            key={index}
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "35px",
              width: "100px",
              textAlign: "center",
            }}
          >
            <h4>{weekday}</h4>
            <p>{day.temp}°C</p>
            <p style={{ fontSize: "28px" }}>{getWeatherIcon(day.weather)}</p>
          </div>
        );
      })}
    </div>
  );
}
