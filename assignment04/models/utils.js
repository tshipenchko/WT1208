const User = require("./User");

module.exports = {
    async requireUser(req, res) {
        const userId = req.session.userId;
        if (!userId) {
            res.redirect("/login?expired=true");
            req.session.destroy();
            return undefined;
        }
        const user = await User.findById(userId).exec();
        if (!user) {
            res.redirect("/login?expired=true");
            req.session.destroy();
            return undefined;
        }
        return user;
    },
};
