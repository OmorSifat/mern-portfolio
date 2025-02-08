import User from '../models/userModel.js';

// Get All Users (Admin Only)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Hide password
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch users, server error." });
    }
};

// Delete User (Admin Only)
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.deleteOne();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Unable to delete user, server error." });
    }
};

// Update User Role (Admin Only)
export const updateUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.role = req.body.role || user.role;
        await user.save();

        res.json({ message: "User role updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Unable to update role, server error." });
    }
};
