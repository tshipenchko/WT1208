module.exports = {
    useRouter(app) {
        app.use("/", require("./root"));
        app.use("/explore", require("./explore"));
        app.use("/profile", require("./profile"));
        app.use("/users", require("./users"));
    },
};
