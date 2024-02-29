const User = require("./User");

module.exports = {
    async requireUser(req, res) {
        const userId = req.session.userId;
        if (!userId) {
            req.session.destroy();
            res.clearCookie("connect.sid");
            res.redirect("/login?expired=true");
            return undefined;
        }
        const user = await User.findById(userId).exec();
        if (!user) {
            req.session.destroy();
            res.clearCookie("connect.sid");
            res.redirect("/login?expired=true");
            return undefined;
        }
        return user;
    },
    async fetchUser(req) {
        const userId = req.session.userId;
        if (!userId) return undefined;
        return await User.findById(userId).exec();
    },
};
