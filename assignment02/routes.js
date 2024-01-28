const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const city = req.query.city || "Astana";

    const currencyFrom = (req.query.currencyFrom || "USD").toLowerCase();
    const currencyTo = (req.query.currencyTo || "KZT").toLowerCase();

    try {
        const [weatherData, currencyData, quoteData] = await Promise.all([
            getWeatherData(city),
            getCurrencyData(currencyFrom, currencyTo),
            getQuoteData(),
        ]);
        res.render("index", {
            city,
            weatherData,
            currencyData,
            currencyFrom,
            currencyTo,
            quoteData,
        });
    } catch (err) {
        res.send(`Internal Server Error: ${err}`);
    }
});

const register = (app) => {
    app.use("/", router);
};

const { OPENWEATHERMAP_TOKEN } = process.env;
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${OPENWEATHERMAP_TOKEN}`;

const getWeatherData = async (city) => {
    const response = await fetch(`${WEATHER_URL}&q=${city}`);
    if (!response.ok) {
        return undefined;
    }
    const data = await response.json();
    // noinspection JSUnresolvedReference
    return {
        temperature: (data.main.temp - 273.15).toFixed(2),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        coordinates: data.coord,
        feelsLike: (data.main.feels_like - 273.15).toFixed(2),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        rainVolume: data.rain ? data.rain["1h"] : 0,
        countryCode: data.sys.country,
    };
};

const CURRENCY_URL =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const getCurrencyData = async (currencyFrom, currencyTo) => {
    const response = await fetch(
        `${CURRENCY_URL}/${currencyFrom}/${currencyTo}.json`,
    );

    if (!response.ok) {
        return undefined;
    }
    const data = await response.json();
    return { rate: data[currencyTo].toFixed(2) };
};

const getQuoteData = async () => {
    const date = new Date().toDateString().replaceAll(" ", "");
    const response = await fetch(`https://zenquotes.io/api/today/${date}`);

    if (!response.ok) {
        return undefined;
    }
    const data = await response.json();
    return { quote: data[0].q, author: data[0].a };
};

module.exports = { register };
