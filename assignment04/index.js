require("dotenv").config();

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const { requireEnv, requireEnvInt } = require("./utils");
const { useRouter } = require("./routes");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.set("views", __dirname + "/templates");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: requireEnv("SESSION_SECRET", "₍^ >ヮ<^₎"),
        resave: false,
        saveUninitialized: true,
    }),
);
useRouter(app);

// noinspection JSUnresolvedReference
mongoose.connect(requireEnv("MONGODB_URI"));

const host = requireEnv("HOST", "0.0.0.0");
const port = requireEnvInt("PORT", 3000);
app.listen(port, host, () => {
    // noinspection HttpUrlsUsage
    console.log(`Server running at http://${host}:${port}/`);
});
