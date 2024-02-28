const express = require("express");
const router = express.Router();
const { requireUser } = require("../models/utils");

router.get("/", (req, res) => {
    const user = requireUser(req, res);
    if (!user) return;

    res.render("profile", { ctx: { active: "profile" } });
});

module.exports = router;
