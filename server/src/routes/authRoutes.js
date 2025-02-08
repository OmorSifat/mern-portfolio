import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// User Registration
router.post('/register', registerUser);

// User Login
router.post('/login', loginUser);

// Get User Profile (Protected Route)
router.get('/profile', authMiddleware, getUserProfile);

export default router;
