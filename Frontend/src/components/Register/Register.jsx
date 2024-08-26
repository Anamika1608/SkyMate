import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import  useAuth  from '../../context/AuthContext';

function Register() {
  const {setIsLoggedIn} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const response = await axios.post("http://localhost:3000/register", {
        email,
        password
      }, {
        withCredentials: true
      });

      if (response) {
        setIsLoggedIn(true);
        navigate('/weather-gallery');
      }
      console.log("User registered successfully:", response.data);

    } catch (error) {
      console.error("Error registering user:", error.response.data);
    }
  };

  return (
    <div>
      <div>create account</div>

      <input type="text" name='email' placeholder='write email' onChange={(e) => setEmail(e.target.value)} value={email} />

      <input type="password" name='password' placeholder='write password' onChange={(e) => setPassword(e.target.value)} value={password} />


      <button onClick={registerUser}>Submit</button>




    </div>
  )
}

export default Register