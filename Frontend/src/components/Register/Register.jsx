import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Register() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      const response = await axios.post("http://localhost:3000/register", {
        email,
        password
      }, {
        withCredentials: true
      });
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

      <Link to= '/weather-gallery'>
        <button onClick={registerUser}>Submit</button>
      </Link>
      
    

    </div>
  )
}

export default Register