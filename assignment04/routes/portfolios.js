const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");
const { requireUser } = require("../models/utils");
const path = require("path");

router.get("/", (req, res) => {
    res.redirect("/explore/");
});

router.get("/:tag", async (req, res) => {
    const portfolio = await Portfolio.findOne({ tag: req.params.tag }).populate("userId").exec();
    if (!portfolio) {
        res.status(404).send("Portfolio not found");
        return;
    }

    res.render("portfolio", { ctx: { portfolio, user: portfolio.userId } });
});

router.post("/", async (req, res) => {
    const user = await requireUser(req, res);
    if (!user) return;

    const { title, description, tag, pictures, descriptions } = req.body;
    const pictureObjects = pictures.map((picture, index) => ({
        filename: path.basename(picture.path),
        description: descriptions[index],
    }));

    const portfolio = new Portfolio({
        title,
        description,
        tag,
        userId: user._id,
        pictures: pictureObjects,
    });

    await portfolio.save();

    res.redirect(`/portfolios/${portfolio._id}`);
});

module.exports = router;
