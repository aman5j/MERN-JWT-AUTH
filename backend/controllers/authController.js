const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require('../utils/generateToken');

exports.register = async(req, res) => {
    try{

        const {
            name,
            email,
            password
        } = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(400).json({message: "User already exist"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({message: "User created", user})

    } catch(error) {
        res.status(500).json({message: error.message});
        // console.log(error.message)
    }


}


exports.login = async(req, res) => {

    const {
        email,
        password
    } = req.body;

    const user = await User.findOne({email});

    if(!user) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = generateToken(user);

    res.json({
        message: "Login Successfully",
        token
    });

}

exports.getUsers = async (req, res) => {
    try {
        // Exclude passwords from being sent back for security
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const dataToUpdate = { ...req.body };

        // If the user is updating their password, hash it first
        if (dataToUpdate.password) {
            dataToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, dataToUpdate, {
            new: true,
            runValidators: true,
        }).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
