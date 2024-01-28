// Fixes for JetBrains IDEs
// noinspection HttpUrlsUsage

require("dotenv").config();
const express = require("express");

const routes = require("./routes");

async function main() {
    const app = express();
    app.use(express.static("public"));
    app.set("views", __dirname + "/templates");
    app.set("view engine", "ejs");
    app.use(express.urlencoded({ extended: true }));

    routes.register(app);

    const host = process.env.HOST || "0.0.0.0";
    const port = process.env.PORT || 3000;
    await app.listen(port, host);
    console.log(`Server listening on http://${host}:${port}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
