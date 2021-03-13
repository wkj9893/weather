import Head from "next/head";
import { useState } from "react";
import { TextField, Button, Typography, Link } from "@material-ui/core";
import axios from "axios";

const APIkey = "ea15140f9cc4c1fbf737f68cf291e471";

export default function Home() {
  const [city, setCity] = useState("");
  const [feelslike, setFeelslike] = useState("");
  const [temp_min, setTemp_min] = useState("");
  const [temp_max, setTemp_max] = useState("");
  const [weather, setWeather] = useState("");
  const [message, setMessage] = useState("");
  const [pm2_5, setPm2_5] = useState("");

  async function get_weather() {
    try {
      const response1 = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&appid=" +
          APIkey +
          "&units=metric"
      );

      if (response1.status == 200) {
        const response2 = await axios.get(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${response1.data.coord.lat}&lon=${response1.data.coord.lon}&appid=${APIkey}`
        );
        if (response2.status == 200) {
          setPm2_5(response2.data.list[0].components.pm2_5 + "μg/m3");
        }
        setMessage("");
        setFeelslike(response1.data.main.feels_like + "°C");
        setTemp_min(response1.data.main.temp_min + "°C");
        setTemp_max(response1.data.main.temp_max + "°C");
        setWeather(response1.data.weather[0].main);
      } else {
        setMessage("Please search for a valid city 😩");
      }
    } catch (error) {
      console.log(error);
      setMessage("Please search for a valid city 😩");
    }
  }

  return (
    <div>
      <Head>
        <title>Simple Weather App</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Typography variant="h3" align="center" gutterBottom>
          Simple Weather App
        </Typography>
      </header>
      <main>
        <TextField
          label="Please input a city"
          variant="outlined"
          onChange={(event) => setCity(event.target.value)}
        />
        <Button
          style={{ marginTop: "20px", marginLeft: "auto", marginRight: "auto" }}
          variant="contained"
          color="primary"
          onClick={get_weather}
        >
          submit
        </Button>
        <Typography variant="h5" gutterBottom>
          Fells like: {feelslike}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Min Temperature: {temp_min}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Max Temperature： {temp_max}
        </Typography>

        <Typography variant="h5" gutterBottom>
          Weather： {weather}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Pm2.5： {pm2_5}
        </Typography>

        <h2>{message}</h2>
      </main>
      <footer>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://github.com/wkj9893/weather">
            wkj9893
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </footer>
      <style jsx>
        {`
          header {
            margin-top: 6%;
          }
          main {
            display: flex;
            flex-direction: column;
            margin-top: 3%;
            margin-left: 10%;
            margin-right: 10%;
          }
          footer {
            margin-top: 5%;
            box-shadow: 0 -0.1875rem 0.125rem #efefef;
            padding-top: 5%;
          }
        `}
      </style>
    </div>
  );
}
