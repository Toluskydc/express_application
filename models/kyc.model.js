const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
    {
        displayPic: {
            type: String,
            required: true,
        },
        docType: {
            type: String,
            required: true,
        },
        frontPic: {
            type: String,
            required: true,
        },
        backPic: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
    },
    { timestamps: true }
);



const kycModel = mongoose.model("KYC", kycSchema);

module.exports = kycModel;