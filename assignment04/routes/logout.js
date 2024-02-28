const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { requireUser } = require("../models/utils");

router.get("/", async (req, res) => {
    const user = requireUser(req, res);
    if (!user) return;

    res.render("logout", { ctx: { user } });
});

router.post("/", async (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});


module.exports = router;
