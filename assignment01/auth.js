// Why I use bcrypt to hash passwords
// https://danboterhoven.medium.com/why-you-should-use-bcrypt-to-hash-passwords-af330100b861
const bcrypt = require("bcrypt");

async function hashPassword(password) {
    // 10 is the number of salt rounds
    // https://www.npmjs.com/package/bcrypt#a-note-on-rounds
    return await bcrypt.hash(password, 8);
}

async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

/** @param {DI} di */
function attachUser(di) {
    return async (req, res, next) => {
        const userId = req.session.user?.id;
        if (userId) {
            const { rows } = await di.db.query(
                "SELECT * FROM Users WHERE id = $1 LIMIT 1",
                [userId],
            );
            if (rows.length === 1) {
                res.locals.user = rows[0];
            } else {
                req.session.destroy();
                res.redirect("/login");
                return;
            }
        }
        next();
    };
}

function requireUnauthorized(res) {
    if (res.locals.user) {
        res.redirect("/profile");
        return true;
    } else {
        return false;
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    attachUser,
    requireUnauthorized,
};
