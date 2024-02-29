const express = require("express");
const User = require("../models/User");
const Portfolio = require("../models/Portfolio");
const { requireUser } = require("../models/utils");
const { sendEmail } = require("../emailer");
const router = express.Router();

const adminOnly = async (req, res, next) => {
    const user = await requireUser(req, res);
    if (typeof user === "undefined") return;

    if (user.role === "admin") {
        res.locals.user = user;
        next();
    } else {
        res.status(403).json({ message: "Admin only" });
    }
};

router.get("/", adminOnly, (req, res) => {
    const user = res.locals.user;
    res.render("admin", { ctx: user });
});

router.get("/users", adminOnly, (req, res) => {
    User.find().then(users => {
        res.json(users);
    }).catch(err => {
        res.json({ message: err });
    });
});

router.delete("/users/:id", adminOnly, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (typeof user === "undefined") {
            res.json({ message: "User not found" });
            return;
        }

        await User.deleteOne({ _id: req.params.id });
        sendEmail(user.email, "Your account has been deleted",
            `<h3>Your account has been deleted by an administrator</h3>`,
        );
        res.json({ message: "User deleted" });
    } catch (err) {
        res.json({ message: err });
    }
});

router.put("/users/:id", adminOnly, (req, res) => {
    User.updateOne({ _id: req.params.id }, { $set: req.body }).then(() => {
        res.json({ message: "User updated" });
    }).catch(err => {
        res.json({ message: err });
    });
});

router.get("/portfolios", adminOnly, (req, res) => {
    Portfolio.find().then(portfolios => {
        res.json(portfolios);
    }).catch(err => {
        res.json({ message: err });
    });
});

router.delete("/portfolios/:id", adminOnly, async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (typeof portfolio === "undefined") {
            res.json({ message: "Portfolio not found" });
            return;
        }

        await Portfolio.deleteOne({ _id: req.params.id });
        res.json({ message: "Portfolio deleted" });

        try {
            const user = await User.findById(portfolio.userId);
            sendEmail(user.email, "Your portfolio has been deleted",
                `<h3>Your portfolio has been deleted by an administrator</h3>`,
            );
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
});

router.put("/portfolios/:id", adminOnly, (req, res) => {
    Portfolio.updateOne({ _id: req.params.id }, { $set: req.body }).then(() => {
        res.json({ message: "Portfolio updated" });
    }).catch(err => {
        res.json({ message: err });
    });
});


module.exports = router;
