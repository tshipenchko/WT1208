const express = require("express");
const router = express.Router();

const { requireAuth } = require("../auth");

/** @param {DI} di */
module.exports = (di) => {
    router.get("/", async (req, res) => {
        const user = res.locals.user;
        if (!user) {
            return res.redirect("/login");
        }

        res.render("profile");
    });

    return router;
};
