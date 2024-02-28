const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/login/");
        return;
    }

    res.render("profile", {ctx: { active: "profile" }});
});

module.exports = router;
