import express from 'express';
import {
    createService, 
    getAllServices, 
    getSingleService, 
    updateService, 
    deleteService
} from '../controllers/serviceController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/*
  Public Routes (Accessible by Everyone)
*/
router.get('/', getAllServices); // Get all services
router.get('/:id', getSingleService); // Get a single service by ID

/*
  Admin-Only Routes (Requires Authentication & Admin Role)
*/
router.post('/', authMiddleware, adminMiddleware, createService); // Create a new service
router.put('/:id', authMiddleware, adminMiddleware, updateService); // Update service by ID
router.delete('/:id', authMiddleware, adminMiddleware, deleteService); // Delete service by ID

export default router;
