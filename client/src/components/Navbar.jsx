import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold text-cyan-300">
          HELLO
        </Link>
        <div className="space-x-6 text-lg font-medium">
          {["Home", "About", "Services", "Blog", "Contact", "Login"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="px-4 py-2 bg-gray-800 rounded hover:bg-cyan-300 hover:text-black transition duration-300"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
