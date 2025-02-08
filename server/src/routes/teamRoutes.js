import express from 'express';
import {
    createTeamMember,
    getAllTeamMembers,
    getSingleTeamMember,
    updateTeamMember,
    deleteTeamMember,
} from '../controllers/teamController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.get('/', getAllTeamMembers); // Get all team members
router.get('/:id', getSingleTeamMember); // Get single team member

// Private (Admin Only) Routes
router.post('/', authMiddleware, adminMiddleware, createTeamMember);
router.put('/:id', authMiddleware, adminMiddleware, updateTeamMember);
router.delete('/:id', authMiddleware, adminMiddleware, deleteTeamMember);

export default router;
