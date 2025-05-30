const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");


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
        const newUser = new userModel({ email, password: hashedPassword, ...others });
        const savedUser = await newUser.save();
        return res.json(savedUser);
    } catch (error) {
        console.log(error.message);
        return res.send("Something went wrong");
    }
};


const getUser = async (req, res) => {
    const allUsers = await userModel.find();
    return res.json(allUsers);
};



const updateUser = async (req, res) => {
    const { id } = req.query;
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
    const { email, password} = req.body;

    const user = await userModel.findOne({email})
    if(!user) {
        return res.send("This account does not exist, create account")
    };
    const isValid = bcrypt.compareSync(password, user.password)
    if (!isValid) {
        return res.send("Invalid password")
    }
    return res.json({id: user.id, name: user.name, email: user.email})
}




module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser
};
