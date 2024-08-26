import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      await axios.get("http://localhost:3000/login"), {
        withCredentials: true
      };

    } catch (error) {
      console.log("error in getting logged", error.message)
    }
  }
  return (
    <div>
      <div>Login for the account</div>

      <input type="text" name='email' placeholder='write email' onChange={(e) => setEmail(e.target.value)} value={email} />

      <input type="password" name='password' placeholder='write password' onChange={(e) => setPassword(e.target.value)} value={password} />

      <Link to='/weather-gallery'>
        <button onClick={loginUser}>Submit</button>
      </Link>



      <div>
        If new account <a href="/register">Register Here</a>
      </div>
    </div>
  )
}

export default Login