import Head from "next/head";
import { TextField, Button } from "@material-ui/core";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Box from "@material-ui/core/Box";

const APIkey = "ea15140f9cc4c1fbf737f68cf291e471";
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
    },
    main: {
        marginTop: theme.spacing(16),
        marginBottom: theme.spacing(2),
    },
    footer: {
        marginTop: theme.spacing(32),
    },
    form: { display: "flex" },
}));

export default function Home() {
    const classes = useStyles();
    const [city, setCity] = useState("");
    const [feelslike, setFeelslike] = useState("");
    const [temp_min, setTemp_min] = useState("");
    const [temp_max, setTemp_max] = useState("");
    const [icon, setIcon] = useState("");
    const [weather, setWeather] = useState("");
    const [message, setMessage] = useState("");
    const [pm2_5, setPm2_5] = useState("");
    async function get_weather(city) {
        try {
            const response1 = await axios.get(
                "http://api.openweathermap.org/data/2.5/weather?q=" +
                    city +
                    "&appid=" +
                    APIkey +
                    "&units=metric"
            );

            if (response1.status == 200) {
                const response2 = await axios.get(
                    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${response1.data.coord.lat}&lon=${response1.data.coord.lon}&appid=${APIkey}`
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
        <div className={classes.root}>
            <Head>
                <title>Simple Weather App</title>
            </Head>

            <main className={classes.main}>
                <div className={classes.form}>
                    <TextField
                        label="Search for a city"
                        variant="outlined"
                        onChange={(event) => setCity(event.target.value)}
                    ></TextField>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => get_weather(city)}
                    >
                        SUBMIT
                    </Button>
                    <h2>{message}</h2>
                </div>

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
            </main>
            <div className={classes.footer}>
                <Box>
                    Made with <span>💙</span> by{" "}
                    <a href="https://github.com/wkj9893" target="_blank">
                        wkj9893
                    </a>
                </Box>
            </div>
        </div>
    );
}
