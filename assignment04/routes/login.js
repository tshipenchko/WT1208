const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { validatePassword } = require("../utils");

router.get("/", (req, res) => {
    const { registered, expired } = req.query;
    const ctx = { alerts: [] };

    if (typeof registered !== "undefined") {
        ctx.alerts.push({ type: "success", html: "You have been registered!" });
    }
    if (typeof expired !== "undefined") {
        ctx.alerts.push({ type: "warning", html: "Your session has expired. Please log in again." });
    }

    res.render("login", { ctx });
});

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    const ctx = { alerts: [] };

    if (!email || !password) {
        ctx.alerts.push({ type: "danger", html: "Email and password are required" });
        res.render("login", { ctx });
        return;
    }

    const user = await User.findOne({ email }).exec();
    if (user && await validatePassword(password, user.password)) {
        req.session.userId = user._id.toString();
        res.redirect("/profile/");
    } else {
        ctx.alerts.push({ type: "danger", html: "Invalid email or password" });
        res.render("login", { ctx });
    }
});


module.exports = router;
