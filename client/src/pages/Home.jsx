import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://server-liard-psi.vercel.app/api/blogs"
        );
        setBlogs(response.data.slice(0, 6)); // Get only 6 blogs
      } catch (error) {
        console.error("Error fetching blog posts", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] bg-cover bg-center flex items-center justify-center text-white bg-[url('https://source.unsplash.com/1600x900/?technology')]">
        <div className="bg-black bg-opacity-50 p-10 rounded-lg text-center">
          <h1 className="text-4xl font-bold">Welcome to Our Website</h1>
          <p className="mt-2 text-lg">Explore the latest blogs and insights</p>
        </div>
      </div>

      {/* Blog Section */}
      <div className="max-w-6xl mx-auto py-10 px-5">
        <h2 className="text-3xl font-bold text-center mb-6">Latest Blogs</h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-600">{blog.description.slice(0, 100)}...</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-500 text-white text-center py-5 mt-10">
        <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
