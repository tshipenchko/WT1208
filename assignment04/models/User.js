const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    age: { type: Number, required: true },
    country: { type: String, required: true },
    gender: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
});

UserSchema.pre("save", (next) => {
    // Allows to set .password directly without hashing
    const user = this;
    if (!user.isModified("password")) return next();
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

module.exports = mongoose.model("User", UserSchema);
