const mongoose = require("mongoose");

// Creating the Message Schema
const msessageSchema = new mongoose.Schema(
    {
        message:{
            text:{
                type: String,
                required: true,
            },
        },
        users: Array,
        sender:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Messages", msessageSchema);