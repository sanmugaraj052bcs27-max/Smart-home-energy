import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login(){

  const navigate = useNavigate();

  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  async function handleSubmit(e) {

  e.preventDefault();

  try {

    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await response.json();

    if (data.status === "success") {

      alert("Login Successful");
      localStorage.setItem("username", data.user.name);
      navigate("/dashboard");

    } else {

      alert("Invalid Credentials");

    }

  } catch (error) {

    console.error(error);
    alert("Server not reachable");

  }
}

  return(

    <div className="login-bg">

      <div className="login-container">

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>
          <p className="forgot" onClick={()=>navigate("/forgot-password")}>
  Forgot Password?
</p>

        </form>

        <p onClick={()=>navigate("/signup")}>
          Don't have account? Sign Up
        </p>

      </div>

    </div>

  );

}

export default Login;
