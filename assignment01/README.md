# assigment01
Useless website with authentication and a database

### docker (recommended)
Copy `dist.env` to `.env` and fill in the values.
</br>
Actually you can run without the .env file, but you should at least change `SESSION_SECRET` in `.env`
```commandline
docker-compose up
```

### local
Copy `dist.env` to `.env` and fill in the values
</br>
You have to run PostgreSQL on your own
</br>
You absolutely need to provide a `SESSION_SECRET` and `POSTGRES_DSN` in the .env file
```commandline
npm install
npm start
```
