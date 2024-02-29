const express = require("express");
const router = express.Router();
const { requireUser } = require("../models/utils");

router.get("/", async (req, res) => {
    const user = await requireUser(req, res);
    if (!user) return;

    res.render("profile", { ctx: { active: "profile" } });
});

module.exports = router;
