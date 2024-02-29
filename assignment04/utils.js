const bcrypt = require("bcrypt");
const uuid = require("uuid");

module.exports = {
    requireEnv(name, defaultValue) {
        const value = process.env[name] || defaultValue;
        if (value === undefined) {
            throw new Error(`Environment variable ${name} is required`);
        }
        return value;
    },
    requireEnvInt(name, defaultValue) {
        const value = parseInt(module.exports.requireEnv(name, defaultValue));
        if (isNaN(value)) {
            throw new Error(`Environment variable ${name} must be an integer`);
        }
        return value;
    },
    async hashPassword(password) {
        const salt = module.exports.requireEnv("PASSWORD_SALT", "");
        const rounds = module.exports.requireEnvInt("PASSWORD_SALT_ROUNDS", 10);
        return await bcrypt.hash(`${password}${salt}`, rounds);
    },
    async validatePassword(password, hash) {
        const salt = module.exports.requireEnv("PASSWORD_SALT", "");
        return await bcrypt.compare(`${password}${salt}`, hash);
    },
    generateUUID() {
        return uuid.v4().replaceAll("-", "");
    },
};
