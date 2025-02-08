import express from 'express';
import {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
} from '../controllers/blogController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   GET /api/blogs
 * @desc    Get all blogs (Public)
 */
router.get('/', getAllBlogs);

/**
 * @route   GET /api/blogs/:id
 * @desc    Get a single blog by ID (Public)
 */
router.get('/:id', getSingleBlog);

/**
 * @route   POST /api/blogs
 * @desc    Create a new blog (Admin Only)
 */
router.post('/', authMiddleware, adminMiddleware, createBlog);

/**
 * @route   PUT /api/blogs/:id
 * @desc    Update a blog by ID (Admin Only)
 */
router.put('/:id', authMiddleware, adminMiddleware, updateBlog);

/**
 * @route   DELETE /api/blogs/:id
 * @desc    Delete a blog by ID (Admin Only)
 */
router.delete('/:id', authMiddleware, adminMiddleware, deleteBlog);

export default router;
