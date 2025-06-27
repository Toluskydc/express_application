const kycModel = require('../models/kyc.model');
const userModel = require('../models/user.model');

const createKYC = async (req, res) => {
    const payload = req.body;
    const { id } = req.user;
    // check if kyc is existing
    const checkKyc = await kycModel.findOne({ user: id });
    if (checkKyc) {
        return res.json({ message: "KYC already exists" });
    }
    try {
        // create the kyc below
        const newKYC = new kycModel({
            user: id,
            ...payload
        });
        const savedKYC = await newKYC.save();
        // update the user with kyc
        await userModel.findByIdAndUpdate(
            id,
            { kyc: savedKYC._id },
            { new: true }
        );
        return res.send("KYC added successfully!!!");
    } catch (error) {
        return res.send(error.message);
    }

}

const getOneKyc = async (req, res) => {
    const { kycId } = req.query;
    try {
        const kyc = await kycModel.findById(kycId).populate('user');
        return res.json(kyc);
    } catch (error) {
        return res.send(error.message);
    }
}


module.exports = { createKYC, getOneKyc };