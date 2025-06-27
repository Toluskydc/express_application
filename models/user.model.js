const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        admin: {
            type: Boolean,
            default: false,
        },
        hobbies: {
            type: [String]
        },
        kyc: {
            type: mongoose.Types.ObjectId,
            ref: "KYC"
        },
        posts: [{type: mongoose.Types.ObjectId, ref: "Post"}]
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;