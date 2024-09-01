import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import useAuth from '../../context/AuthContext';
import { Eye, EyeOff, Cloud, Sun, Wind } from 'lucide-react';

export default function Login() {
  const { setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult['code']) {
        const response = await axios.post(`http://localhost:3000/googleLogin?code=${authResult['code']}`);
        if (response) {
          setIsLoggedIn(true);
          navigate('/weather-gallery')
        }
      }
    } catch (error) {
      console.error('Error during Google login:', error.message);
    }
  };

  const login = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code'
  });

  const loginUser = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", { email, password }, { withCredentials: true });
      if (response) {
        setIsLoggedIn(true);
        navigate('/weather-gallery')
      }
    } catch (error) {
      console.log("Error logging in:", error.message)
    }
  }

  return (
    <div className=" flex items-center justify-center p-4">
      
        {/* <div className="w-2/3 p-10 bg-indigo-600 text-white relative hidden lg:block">
          <h1 className="text-4xl font-bold mb-6">WeatherWise</h1>
          <p className="text-xl mb-8">Explore the World's Weather Patterns with Expert Insights</p>
          <div className="absolute bottom-0 left-0 right-0 p-12">
            <div className="flex items-center space-x-4 pt-44">
              <Cloud className="w-12 h-12" />
              <Sun className="w-16 h-16 text-yellow-300" />
              <Wind className="w-12 h-12" />
            </div>
          </div>
        </div> */}
        <div className="w-full lg:w-3/6 p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back :)</h2>
            <p className="text-gray-600 mt-2">Please login to your account</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); loginUser(); }}>
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
              Sign In
            </button>
          </form>
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <hr className="w-full border-t border-gray-300" />
              <span className="px-2 text-gray-500 bg-white">or</span>
              <hr className="w-full border-t border-gray-300" />
            </div>
            <button
              onClick={login}
              className="w-full bg-white border border-gray-300 text-gray-700 rounded-lg px-4 py-3 font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              Continue with Google
            </button>
          </div>
          <p className="text-center mt-8 text-sm text-gray-600">
            Don't have an account? <a href="/register" className="text-indigo-600 hover:text-indigo-700 font-semibold">Register here</a>
          </p>
        </div>
      
    </div>
  );
}