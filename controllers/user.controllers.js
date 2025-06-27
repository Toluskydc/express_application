const userModel = require("../models/user.model");
const kycModel = require("../models/kyc.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
    const { email, password, ...others } = req.body;
    if (!email || !password) {
        return res.send("Please provide a valid registration credentials");
    }
    const isUser = await userModel.findOne({ email });
    if (isUser) {
        return res.send("User already exists, please login to your account.");
    }
    // create a hash of the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
        const newUser = new userModel({
            email,
            password: hashedPassword,
            ...others,
        });
        const savedUser = await newUser.save();
        return res.json(savedUser);
    } catch (error) {
        console.log(error.message);
        return res.send("Something went wrong");
    }
};


const getUserById = async (req, res) => {
    const { id } = req.user;
    const allUsers = await userModel.findById(id).populate("kyc").populate("posts");
    return res.json(allUsers);
};




const getUser = async (req, res) => {
    const allUsers = await userModel.find().populate("post");
    return res.json(allUsers);
};



const updateUser = async (req, res) => {
    const { id } = req.user;
    const payload = req.body;
    const updateUser = await userModel.findByIdAndUpdate(
        id,
        { ...payload },
        { new: true }
    );
    return res.json(updateUser);
};

const deleteUser = async (req, res) => {
    const { id } = req.query;
    const deletedUser = await userModel.findByIdAndDelete(id);
    return res.json(deletedUser);
};



const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.send("This account does not exist, create account");
    }
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
        return res.send("Invalid password");
    }
    // create a token
    const token = jwt.sign(
        { id: user._id, admin: user.admin },
        process.env.JWT_SECRET,
        { expiresIn: "2hr" }
    );
    // return basic info
    res.cookie("token", token, {
        maxAge: 1000 * 60 * 60,
        secure: true,
        httpOnly: true,
    });
    return res.json({ message: "this user was succesfully logged in" });
};




module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser
};
