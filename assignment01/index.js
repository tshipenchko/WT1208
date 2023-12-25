// Fixes for JetBrains IDEs
// noinspection HttpUrlsUsage, SqlNoDataSourceInspection

require("dotenv").config();
const express = require("express");
const pg = require("pg");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const routes = require("./routes");
const { attachUser } = require("./auth");

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

    const db = new pg.Pool({
        connectionString:
            process.env.POSTGRES_DSN || panic("POSTGRES_DSN not set"),
    });

    /** @type {DI} */
    const di = { db };
    await init(di);
    app.use(
        require("express-session")({
            secret:
                process.env.SESSION_SECRET || panic("SESSION_SECRET not set"),
            resave: false,
            saveUninitialized: false,
            store: new pgSession({
                pool: db,
            }),
        }),
    );
    app.use(attachUser(di));
    routes.register(app, di);

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
    await di.db.query(`
        CREATE TABLE IF NOT EXISTS "session"
        (
            "sid"    varchar      NOT NULL COLLATE "default",
            "sess"   json         NOT NULL,
            "expire" timestamp(6) NOT NULL,
            CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE
        ) WITH (OIDS= FALSE);

        CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
    `);
}

main().catch((error) => {
    panic(error);
});
