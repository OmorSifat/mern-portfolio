import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://server-liard-psi.vercel.app/api/users');
      const users = await response.json();
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );
      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-8 rounded-xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-cyan-300 mb-8">Log In</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-400 text-center">{error}</p>}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-cyan-200 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-cyan-200 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded-lg transition duration-300"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;