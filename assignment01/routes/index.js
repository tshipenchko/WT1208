module.exports = {
    register: (app, di) => {
        app.use("/", require("./root")(di));
        app.use("/register", require("./register")(di));
        app.use("/login", require("./login")(di));
        app.use("/profile", require("./profile")(di));
        app.use("/logout", require("./logout")(di));
    },
};
