const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const city = req.query.city || "Astana";

    const currencyFrom = (req.query.currencyFrom || "USD").toLowerCase();
    const currencyTo = (req.query.currencyTo || "KZT").toLowerCase();

    try {
        const [weatherData, currencyData, quoteData, extendedWeatherData] = await Promise.all([
            getWeatherData(city),
            getCurrencyData(currencyFrom, currencyTo),
            getQuoteData(),
            getExtendedWeatherData(city),
        ]);
        res.render("index", {
            city,
            weatherData,
            currencyData,
            currencyFrom,
            currencyTo,
            quoteData,
            extendedWeatherData,
        });
    } catch (err) {
        res.send(`Internal Server Error: ${err}`);
        console.error(err);
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

const EXTENDED_WEATHER_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${OPENWEATHERMAP_TOKEN}`;
const getExtendedWeatherData = async (city) => {
    const response = await fetch(`${EXTENDED_WEATHER_URL}&q=${city}`);

    if (!response.ok) {
        return undefined;
    }
    const data = await response.json();
    // noinspection JSUnresolvedReference
    const result = data.list.map(day => ({
        date: new Date(day.dt * 1000).toDateString(),
        temperatureMax: (day.main.temp_max - 273.15).toFixed(2),
        temperatureMin: (day.main.temp_min - 273.15).toFixed(2),
    }));

    const uniqueDates = {};
    const uniqueResult = [];
    for (const day of result) {
        if (!uniqueDates[day.date]) {
            uniqueDates[day.date] = true;
            uniqueResult.push(day);
        } else if (day.temperatureMax > uniqueResult[uniqueResult.length - 1].temperatureMax) {
            uniqueResult[uniqueResult.length - 1].temperatureMax = day.temperatureMax;
        } else if (day.temperatureMin < uniqueResult[uniqueResult.length - 1].temperatureMin) {
            uniqueResult[uniqueResult.length - 1].temperatureMin = day.temperatureMin;
        }
    }
    return uniqueResult;
};


const CURRENCY_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
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


const QUOTE_URL = "https://zenquotes.io/api/today";
const getQuoteData = async () => {
    const date = new Date().toDateString().replaceAll(" ", "");
    const response = await fetch(`${QUOTE_URL}/${date}`);

    if (!response.ok) {
        return undefined;
    }
    const data = await response.json();
    return { quote: data[0].q, author: data[0].a };
};

module.exports = { register };
