const express = require("express");
const router = express.Router();
const { requireUser } = require("../models/utils");
const User = require("../models/User");
const Portfolio = require("../models/Portfolio");
const { sendEmail } = require("../emailer");

router.get("/", async (req, res) => {
    const user = await requireUser(req, res);
    if (!user) return;

    const ctx = { active: "profile", user, alerts: [] };
    const { deleted } = req.query;

    if (typeof deleted !== "undefined") {
        ctx.alerts.push({ type: "success", html: "Portfolio was deleted successfully" });
    }

    ctx.portfolios = await Portfolio.find({ userId: user._id });

    res.render("profile", { ctx });
});

router.get("/edit", async (req, res) => {
    const user = await requireUser(req, res);
    if (!user) return;
    res.render("editProfile", { ctx: { user } });
});

router.post("/edit", async (req, res) => {
    const user = await requireUser(req, res);
    if (!user) return;

    const { firstName, lastName, email } = req.body;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    await user.save();
    res.redirect("/profile/");
});

router.get("/delete", async (req, res) => {
    const user = await requireUser(req, res);
    if (!user) return;

    await User.deleteOne({ _id: user._id });
    await Portfolio.deleteMany({ userId: user._id });

    sendEmail(user.email, "Your account has been deleted",
        `<h3>We're sorry to see you go, ${user.firstName} ${user.lastName}. Your account has been successfully deleted.</h3>`,
    );

    req.session.destroy();
    res.clearCookie("connect.sid");
    res.redirect("/login");
});

module.exports = router;
