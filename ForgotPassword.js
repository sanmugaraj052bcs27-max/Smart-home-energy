import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword(){

const [email,setEmail]=useState("");
const navigate = useNavigate();

async function sendOtp(){

try{

const response = await fetch("http://localhost:8080/api/send-otp",{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({email:email})

});

const data = await response.text();

if(data.includes("OTP")){
alert("OTP Sent Successfully");

navigate("/otp",{state:{email:email,type:"reset"}});

}else{
alert("Email not found");
}

}catch(error){
alert("Server Error");
}

}

return(

<div className="forgot-bg">

<div className="forgot-container">

<h2>Forgot Password</h2>

<input
type="email"
placeholder="Enter Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<button onClick={sendOtp}>
Send OTP
</button>

</div>

</div>

);

}

export default ForgotPassword;