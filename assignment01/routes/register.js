const express = require("express");
const router = express.Router();

const { hashPassword, requireUnauthorized } = require("../auth");

/** @param {DI} di */
module.exports = (di) => {
    const options = { active: { register: true } };

    router.get("/", (req, res) => {
        if (requireUnauthorized(res)) return;
        res.render("register", options);
    });

    // It uses browser's default form submission
    router.post("/", async (req, res) => {
        if (requireUnauthorized(res)) return;
        const { email, password, username } = req.body;
        const { db } = di;

        const result = await db.query(
            "SELECT 1 FROM users WHERE email = $1 OR username = $2 LIMIT 1",
            [email, username],
        );
        if (result.rowCount > 0) {
            return res.render("register", {
                ...options,
                error: "Email or username already occupied",
            });
        }

        const hashedPassword = await hashPassword(password);
        await db.query(
            "INSERT INTO users (email, password, username) VALUES ($1, $2, $3)",
            [email, hashedPassword, username],
        );

        res.redirect("/login?ref=register");
    });

    return router;
};
