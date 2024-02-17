const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 256,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 256,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
