import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

function Login() {
  const { setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
  try {
    if (authResult['code']) {
      const response = await axios.post(`http://localhost:3000/googleLogin?code=${authResult['code']}`);
      if (response) {
        setIsLoggedIn(true);
        navigate('/weather-gallery')
      }
      console.log(response.data);
    }
  } catch (error) {
    console.error('Error during Google login:', error.message);
  }
};


  const login = useGoogleLogin(
    {
      onSuccess: responseGoogle,
      onError: responseGoogle,
      flow: 'auth-code'
    }
  );

  const loginUser = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email, password
      }, {
        withCredentials: true
      });

      if (response) {
        setIsLoggedIn(true);
        navigate('/weather-gallery')
      }

    } catch (error) {
      console.log("error in getting logged", error.message)
    }
  }

  return (
    <div>
      <div>Login for the account</div>

      <input type="text" name='email' placeholder='write email' onChange={(e) => setEmail(e.target.value)} value={email} />

      <input type="password" name='password' placeholder='write password' onChange={(e) => setPassword(e.target.value)} value={password} />


      <button onClick={loginUser}>Submit</button>

      <div>
        Login with Google
        <button onClick={login}>Login</button>
      </div>

      <div>
        If new account <a href="/register">Register Here</a>
      </div>
    </div>
  )
}

export default Login