const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("profile", {ctx: { active: "profile" }});
});

module.exports = router;
