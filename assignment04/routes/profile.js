const express = require("express");
const router = express.Router();
const { requireUser } = require("../models/utils");
const Portfolio = require("../models/Portfolio");

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

module.exports = router;
