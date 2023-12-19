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

module.exports = {
    hashPassword,
    comparePassword,
};
