import Blog from '../models/blogModel.js';

// Create Blog (Admin Only)
export const createBlog = async (req, res) => {
    try {
        const { title, content, category } = req.body;

        // Create a new blog
        const newBlog = new Blog({
            title,
            content,
            category,
            author: req.user._id
        });

        await newBlog.save();
        res.status(201).json({ success: true, message: "Blog created successfully", blog: newBlog });
    } catch (error) {
        console.error("Create Blog Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get All Blogs (Public)
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "name email");
        res.json({ success: true, blogs });
    } catch (error) {
        console.error("Get All Blogs Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get Single Blog by ID
export const getSingleBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "name email");
        if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

        res.json({ success: true, blog });
    } catch (error) {
        console.error("Get Single Blog Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Update Blog (Only Admin or Author)
export const updateBlog = async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

        // Ensure only admin or the author can update
        if (req.user.role !== "admin" && req.user._id.toString() !== blog.author.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized to update this blog" });
        }

        // Blog update
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.category = category || blog.category;

        await blog.save();
        res.json({ success: true, message: "Blog updated successfully", blog });
    } catch (error) {
        console.error("Update Blog Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Delete Blog (Only Admin or Author)
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

        // Ensure only admin or the author can delete
        if (req.user.role !== "admin" && req.user._id.toString() !== blog.author.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized to delete this blog" });
        }

        await blog.deleteOne();
        res.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Delete Blog Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
