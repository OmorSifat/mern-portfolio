import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Authentication Middleware (For general users)
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(401).json({ success: false, message: "Access Denied" });

        // Extract token from "Bearer <token>"
        const extractedToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

        // Verify JWT Token
        const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password"); // Load user data

        if (!req.user) return res.status(404).json({ success: false, message: "User not found" });

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(401).json({ success: false, message: "Invalid or Expired Token" });
    }
};

// Admin Middleware (Only admins can perform CRUD operations)
export const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ success: false, message: "Admin access required" });
    }
    next();
};
