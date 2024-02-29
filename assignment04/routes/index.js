module.exports = {
    useRouter(app) {
        app.use("/", require("./root"));
        app.use("/explore", require("./explore"));
        app.use("/profile", require("./profile"));
        app.use("/login", require("./login"));
        app.use("/register", require("./register"));
        app.use("/logout", require("./logout"));
        app.use("/portfolios", require("./portfolios"));
        app.use("/ext", require("./ext"));
        app.use("/admin", require("./admin"));
    },
};
