const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    // Needed for URL: /portfolios/:tag
    tag: { type: String, required: true, unique: true },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pictures: [{
        filename: { type: String, required: true },
        description: { type: String, required: true }
    }],

    creationDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
