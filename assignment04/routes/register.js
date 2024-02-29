const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { hashPassword } = require("../utils");
const { sendEmail } = require("../emailer");

router.get("/", (req, res) => {
    const { fromLoginPage } = req.query;
    const ctx = { alerts: [] };

    if (typeof fromLoginPage !== "undefined") {
        ctx.alerts.push({
            type: "success",
            html: "Thanks for choosing us! Please fill in the form below to register.",
        });
    }

    res.render("register", { ctx });
});

router.post("/", async (req, res) => {
    let { email, password, firstName, lastName, country, gender } = req.body;
    const ctx = { alerts: [] };

    if (!email || !password || !firstName || !lastName || !country || !gender) {
        ctx.alerts.push({ type: "danger", html: "All fields are required" });
        res.render("register", { ctx });
        return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        ctx.alerts.push({ type: "danger", html: "Email already in use" });
        res.render("register", { ctx });
        return;
    }

    password = await hashPassword(password);
    const user = new User({ email, password, firstName, lastName, country, gender });
    await user.save();

    sendEmail(email, "Welcome to our platform",
        `<h3>Welcome ${firstName}! You have successfully registered to our platform.</h3>`,
    );

    res.redirect("/login/?registered=true");
});

module.exports = router;
