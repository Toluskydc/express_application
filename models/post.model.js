const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        previewPic: {
            type: String,
            required: true,
            trim: true,
        },
        creator: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);



const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;