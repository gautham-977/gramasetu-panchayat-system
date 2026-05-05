const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// REGISTER
const register = async (req, res) => {
    try {
        const { name, password, role } = req.body;

        const existingUser = await User.findOne({ name, role });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this role" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            password: hashedPassword,
            role
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error during registration" });
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const { name, password } = req.body;

        const user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            user: {
                id: user._id,
                name: user.name
            },
            role: user.role,
            token
        });

    } catch (error) {
        res.status(500).json({ message: "Server error during login" });
    }
};

// ✅ EXPORT FIX
module.exports = {
    register,
    login
};