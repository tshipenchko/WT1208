require("dotenv").config();

const express = require("express");
const session = require("express-session");
const formData = require("express-form-data");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { requireEnv, requireEnvInt } = require("./utils");
const { useRouter } = require("./routes");

const app = express();

app.use(morgan("combined"));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(formData.parse({
    uploadDir: __dirname + "/uploads",
}));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());
app.set("views", __dirname + "/templates");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: requireEnv("SESSION_SECRET", "₍^ >ヮ<^₎"),
        resave: false,
        secure: true,
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
