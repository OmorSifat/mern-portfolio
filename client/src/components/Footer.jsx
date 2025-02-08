
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <p>© {new Date().getFullYear()} My Website. All Rights Reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-400 transition duration-300">
              <i className="fab fa-facebook-f"></i> {/* Add font awesome icons for social links */}
            </a>
            <a href="#" className="hover:text-gray-400 transition duration-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-400 transition duration-300">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="hover:text-gray-400 transition duration-300">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="text-center mt-4 text-sm">
          <p>Designed and Developed by My Website Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;