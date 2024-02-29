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

router.delete("/:id", async (req, res) => {
    const user = await requireUser(req, res);
    if (!user) return;

    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
        res.status(404).send("Portfolio not found");
        return;
    }

    if (portfolio.userId.toString() !== user._id.toString()) {
        res.status(403).send("You are not authorized to delete this portfolio");
        return;
    }

    await Portfolio.deleteOne({ _id: portfolio._id }).exec();
    res.send("OK");
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

    try {
        await portfolio.save();
    } catch (err) {
        res.status(400).json({ error: err.message });
        return;
    }

    res.redirect(`/portfolios/${portfolio.tag}`);
});

router.get("/:id/edit", async (req, res) => {
    const user = await requireUser(req, res);
    if (!user) return;

    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
        res.status(404).send("Portfolio not found");
        return;
    }

    if (portfolio.userId.toString() !== user._id.toString()) {
        res.status(403).send("You are not authorized to edit this portfolio");
        return;
    }

    res.render("editPortfolio", { ctx: { portfolio } });
});

router.put("/:id", async (req, res) => {
    const user = await requireUser(req, res);
    if (!user) return;

    const { title, description, tag } = req.body;

    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) {
            res.status(404).send("Portfolio not found");
            return;
        }

        portfolio.title = title;
        portfolio.description = description;
        portfolio.tag = tag;
        portfolio.updateDate = new Date();

        await portfolio.save();
        res.json({ portfolio });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
