import { useEffect, useState } from "react";
import axios from "axios";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("https://server-liard-psi.vercel.app/api/blog");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blog posts", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold my-5">Our Blog</h1>
      <div className="grid grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-4 shadow-lg rounded-md">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p>{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;