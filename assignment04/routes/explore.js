const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");

router.get("/", async (req, res) => {
    const rawPortfolios = await Portfolio.find().limit(5).populate("userId").exec();
    const portfolios = rawPortfolios.map(portfolio => {
        return {
            portfolio,
            user: portfolio.userId,
        };
    });
    res.render("explore", { ctx: { portfolios, active: "explore" } });
});

router.get("/portfolios", async (req, res) => {
    let { skip = "0", limit = "5" } = req.query;
    skip = parseInt(skip);
    limit = parseInt(limit);

    if (isNaN(skip) || isNaN(limit)) {
        res.status(400).send("Invalid skip or limit");
        return;
    }

    const rawPortfolios = await Portfolio.find().skip(skip).limit(limit).populate("userId").exec();
    const portfolios = rawPortfolios.map(portfolio => {
        return {
            portfolio,
            user: portfolio.userId,
        };
    });

    res.json(portfolios);
});
module.exports = router;
