import React, { useState } from 'react'

function Register() {
    const [email , setEmail] = useState("");
    const [pw,setPw] = useState("");

    const registerUser = ()=>{
        
    }

  return (
    <div>
        <h1>create account</h1>

        <input type="text"  placeholder='write email' onChange={(e)=>setEmail(e.target.value)}/>

        <input type="text"  placeholder='write password' onChange={(e)=>setEmail(e.target.value)}/>
        
        <button onClick={registerUser}>Submit</button>
    </div>
  )
}

export default Register