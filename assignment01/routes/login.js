const express = require("express");
const router = express.Router();

const { comparePassword, requireUnauthorized } = require("../auth");

/** @param {DI} di */
module.exports = (di) => {
    router.get("/", (req, res) => {
        if (requireUnauthorized(res)) return;
        const options = {
            ref: req.query.ref || null,
        };

        res.render("login", options);
    });

    router.post("/", async (req, res) => {
        if (requireUnauthorized(res)) return;
        const { email, password } = req.body;

        const { rows } = await di.db.query(
            "SELECT id, password FROM users WHERE email = $1 LIMIT 1",
            [email],
        );
        const user = rows[0];

        if (
            rows.length === 0 ||
            !(await comparePassword(password, user.password))
        ) {
            return res.render("login", {
                error: "Invalid username or password",
            });
        }

        delete user.password;
        req.session.user = user;

        res.redirect("/profile");
    });

    return router;
};
