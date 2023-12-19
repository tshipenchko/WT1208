const express = require("express");
const router = express.Router();

/** @param {DI} di */
module.exports = (di) => {
    router.get("/", (req, res) => {
        res.render("index");
    });

    return router;
};
