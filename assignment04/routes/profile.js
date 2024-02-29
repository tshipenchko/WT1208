const express = require("express");
const router = express.Router();
const { requireUser } = require("../models/utils");
const Portfolio = require("../models/Portfolio");

router.get("/", async (req, res) => {
    const user = await requireUser(req, res);
    if (!user) return;

    const portfolios = await Portfolio.find({ userId: user._id });

    res.render("profile", { ctx: { active: "profile", portfolios, user } });
});

module.exports = router;
