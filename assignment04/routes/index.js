module.exports = {
    useRouter(app) {
        app.use("/", require("./root"));
        app.use("/explore", require("./explore"));
        app.use("/profile", require("./profile"));
        app.use("/users", require("./users"));
        app.use("/login", require("./login"));
        app.use("/register", require("./register"));
    },
};
