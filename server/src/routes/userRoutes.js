import express from 'express';
import { getAllUsers, 
    deleteUser, 
    updateUserRole } from '../controllers/userController.js'; // ./src/controllers/userController.js"
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin Routes
router.get('/', authMiddleware, adminMiddleware, getAllUsers);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);
router.put('/:id', authMiddleware, adminMiddleware, updateUserRole);

export default router;
