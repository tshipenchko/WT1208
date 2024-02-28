const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("root", {ctx: { active: "root" }});
});

module.exports = router;
