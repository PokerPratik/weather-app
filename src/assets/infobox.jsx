import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./infobox.css";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import SnowboardingIcon from "@mui/icons-material/Snowboarding";
import SunnyIcon from "@mui/icons-material/Sunny";

export default function Infobox({ info }) {
  const INIT_URL =
    "https://images.unsplash.com/photo-1686487220868-13d19709b784?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  //   let Info = {
  //     city: "Pune",
  //     feelsLike: 303.78,
  //     humidity: 17,
  //     temp: 306.01,
  //     tempMax: 306.01,
  //     tempMin: 303.37,
  //     weather: "Clouds",
  //   };

  let HOT_URL =
    "https://tse1.mm.bing.net/th/id/OIP.aGwRkzUjY-pWSUiyBmeM9AHaEo?rs=1&pid=ImgDetMain&o=7&rm=3";

  let COLD_URL = "https://images4.alphacoders.com/134/thumb-1920-1341445.png";

  let RAINY_URL =
    "https://tse2.mm.bing.net/th/id/OIP.pJ7R6R8vz2YpyDN1eFLLpgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3";

  let VERY_COLD_URL =
    "https://tse1.mm.bing.net/th/id/OIP.5SFUfVxmTPKWGsTvgMNfvwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3";

  return (
    <div className="Infobox">
      <div className="card-container">
        <Card sx={{ maxWidth: 800 }}>
          <CardMedia
            sx={{ height: 200, width: 700, margin: "0 auto" }}
            image={
              info.humidity > 80
                ? RAINY_URL
                : info.temp > 30
                  ? HOT_URL
                  : info.temp < 15
                    ? VERY_COLD_URL
                    : COLD_URL
            }
            title="weather image"
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {info.city}
              {/* {info.humidity > 80 ? (
                <ThunderstormIcon />
              ) : info.temp > 25 ? (
                <SunnyIcon />
              ) : info.temp < 15 ? (
                <AcUnitIcon /> // better for cold weather
              ) : (
                <CloudIcon />
              )} */}
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <div>Temperature: {info.temp}&deg;C</div>
              <div>Feels Like: {info.feelsLike}&deg;C</div>
              <div>Humidity: {info.humidity}%</div>
              <div>Min Temp: {info.tempMin}&deg;C</div>
              <div>Max Temp: {info.tempMax}&deg;C</div>
              <div>Weather: {info.weather}</div>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
