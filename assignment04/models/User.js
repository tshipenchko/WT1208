const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    country: { type: String, required: true },
    gender: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
