const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const city = req.query.city || "Astana";

    const currencyFrom = (req.query.currencyFrom || "USD").toLowerCase();
    const currencyTo = (req.query.currencyTo || "KZT").toLowerCase();

    try {
        const weatherData = await getWeatherData(city);
        const currencyData = await getCurrencyData(currencyFrom, currencyTo);
        const quoteData = await getQuoteData();

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
    const data = await (await fetch(`${WEATHER_URL}&q=${city}`)).json();
    // noinspection JSUnresolvedReference
    return {
        temperature: (data.main.temp - 273.15).toFixed(2),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        coordinates: data.coord,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        countryCode: data.sys.country,
    };
};

const CURRENCY_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const getCurrencyData = async (currencyFrom, currencyTo) => {
    const response = await fetch(`${CURRENCY_URL}/${currencyFrom}/${currencyTo}.json`);

    if (!response.ok) {
        return undefined;
    }
    const data = await response.json();
    return { rate: data[currencyTo].toFixed(2) };
};

const getQuoteData = async () => {
    const date = (new Date()).toDateString().replaceAll(" ", "");
    const response = await fetch(`https://zenquotes.io/api/today/${date}`);
    console.log(`https://zenquotes.io/api/today/${date}`);
    console.log(response);

    if (!response.ok) {
        return undefined;
    }
    const data = await response.json();
    return { quote: data[0].q, author: data[0].a };
};


module.exports = { register };