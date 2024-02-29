const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");

router.get("/", async (req, res) => {
    const portfolios = await Portfolio.find().limit(10).populate("user").exec();
    res.render("explore", { ctx: { portfolios, active: "explore" } });
});

router.get("/portfolios", async (req, res) => {
    const { skip = 0, limit = 10 } = req.query;
    const portfolios = await Portfolio.find().skip(parseInt(skip)).limit(parseInt(limit)).populate("user").exec();
    res.json(portfolios);
});
module.exports = router;
