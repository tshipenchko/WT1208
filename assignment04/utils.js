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
};
