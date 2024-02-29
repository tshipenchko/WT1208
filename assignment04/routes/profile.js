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

module.exports = router;
