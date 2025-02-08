import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// User Registration
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const newUser = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ success: true, message: "User registered successfully", user: { id: newUser._id, name, email } });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// User Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user existence
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: "Invalid email or password" });

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Invalid email or password" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Send response
        res.json({ success: true, message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        res.json({ success: true, user });
    } catch (error) {
        console.error("Profile Fetch Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
