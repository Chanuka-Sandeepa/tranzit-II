import { useState } from 'react';
import { motion  } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Use the correct signup endpoint
      const response = await axios.post('http://localhost:9000/auth/api/register', formData);
      
      console.log('Signup Successful:', response.data);
      // Redirect to login page after successful signup
      navigate('/login');
    } catch (error) {
      console.error('Signup Error:', error.response?.data || error.message);
      setError('Signup failed. Please check your information or try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3fffd]">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-96"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Sign Up</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter your name"
              required
            />
          </div>
          
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="example@gmail.com"
              required
            />
          </div>
          
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Create a password"
              required
            />
          </div>
          
          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-emerald-400 text-white py-3 px-6 rounded-lg hover:bg-emerald-500 transition-colors"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <span
            className="text-emerald-500 hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Log in
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;