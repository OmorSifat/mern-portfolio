import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        content: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        category: { type: String, required: true, trim: true },
    },
    { timestamps: true } // Auto-create `createdAt` & `updatedAt`
);

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
