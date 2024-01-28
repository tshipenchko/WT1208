# assigment02

Useless widget application

### local

Copy `dist.env` to `.env` and fill in the values
</br>
You have to obtain [OpenWeatherMap API key](https://openweathermap.org/api) and provide it in the .env file
</br>

```commandline
npm clean-install
npm start
```

### Key features

The application has only one page with a widget. Widget shows:

- current weather in the city
- currency exchange rate
- quote of the day

Application uses
[OpenWeatherMap API](https://openweathermap.org/api),
[Currency API](https://github.com/fawazahmed0/currency-api)
and [ZenQuotes API](https://docs.zenquotes.io/zenquotes-documentation/)
to get the data.