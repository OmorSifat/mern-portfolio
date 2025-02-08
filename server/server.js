// Importing the database connection file
import connectDB from "./src/config/db.js";

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Import required modules
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// Import route handlers
import authRoutes from './src/routes/authRoutes.js';
import blogRoutes from './src/routes/blogRoutes.js';
import teamRoutes from './src/routes/teamRoutes.js';
import serviceRoutes from './src/routes/serviceRoutes.js';
import userRoutes from './src/routes/userRoutes.js';

// Import error handling middleware
import errorHandler from './src/middleware/errorMiddleware.js';

import logger from './src/middleware/loggerMiddleware.js';

// Initialize Express app
const app = express();

// Apply middleware
const corsOptions = {
    origin: 'http://localhost:5173', // Allow only your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions )); // Enable Cross-Origin Resource Sharing (CORS)

app.use(express.json()); // Parse JSON request bodies

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

// Logging middleware
app.use(logger);

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

// Apply rate limiting middleware to all routes except for the login and registration routes
app.use(limiter);

// Call the database connection function
connectDB();

// Default API route for testing server status
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server and listen on the defined port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
