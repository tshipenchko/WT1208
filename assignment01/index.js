// Fixes for JetBrains IDEs
// noinspection HttpUrlsUsage, SqlNoDataSourceInspection

require("dotenv").config();
const express = require("express");
const pg = require("pg");

const routes = require("./routes");

function panic(message) {
    console.error(message);
    process.exit(1);
}

async function main() {
    const app = express();
    app.set("views", __dirname + "/templates");
    app.set("view engine", "ejs");
    app.use(express.urlencoded({ extended: true }));

    app.use(require("cookie-parser")());
    app.use(
        require("express-session")({
            secret:
                process.env.SESSION_SECRET || panic("SESSION_SECRET not set"),
            resave: false,
            saveUninitialized: false,
        }),
    );

    const db = new pg.Pool({
        connectionString: process.env.POSTGRES_DSN,
    });

    /** @type {DI} */
    const di = { db };
    routes.register(app, di);
    await init(di);

    const host = process.env.HOST || "0.0.0.0";
    const port = process.env.PORT || 3000;
    await app.listen(port, host);
    console.log(`Server listening on http://${host}:${port}`);
}

/** @param {DI} di */
async function init(di) {
    await di.db.query(`
        CREATE TABLE IF NOT EXISTS Users
        (
            id       SERIAL PRIMARY KEY,
            email    VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255)        NOT NULL,
            username VARCHAR(255) UNIQUE NOT NULL
        )
    `);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
