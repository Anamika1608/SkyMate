import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const { setIsLoggedIn } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        { name, email, password },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setIsLoggedIn(true);
        navigate("/weather-gallery");
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error registering user:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full lg:w-3/6 p-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-600 mt-2">Please register to get started</p>
        </div>
        <form onSubmit={registerUser}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:outline-none"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:border-indigo-500 focus:bg-white focus:outline-none pr-10"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center top-8"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
            </button>
          </div>
          <button
            className="w-full bg-indigo-600 text-white rounded-lg px-4 py-3 mt-6 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
            type="submit"
          >
            Create Account
          </button>
        </form>
        <p className="text-center mt-8 text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">Login here</Link>
        </p>
      </div>
    </div>
  );
}