import { useState } from "react";
import {motion  } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:3400/auth/api/login", { email, password });
  
      if (response.status === 200) {
        const { token, user } = response.data;
  
        // Store token and role in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
  
        // Force a page reload to trigger useEffect in App.js
        window.location.reload();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password!");
  
      // Remove error message after 3 seconds
      setTimeout(() => {
        setError("");
      }, 3000);
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
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Login</h2>

        {error && (
          <motion.p 
            className="text-red-500 text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center text-sm">
            <div>
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-600">Remember me</label>
            </div>
            <a href="#" className="text-emerald-500 hover:underline">Forgot password?</a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-emerald-400 text-white py-3 px-6 rounded-lg hover:bg-emerald-500 transition-colors"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Do not have an account?  
          <span 
            className="text-emerald-500 hover:underline cursor-pointer" 
            onClick={() => navigate('/signup')} 
          >
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
