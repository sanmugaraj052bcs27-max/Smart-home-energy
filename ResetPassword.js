import React,{useState} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword(){

const location = useLocation();
const navigate = useNavigate();

const email = location.state?.email;

const [password,setPassword]=useState("");
const [confirm,setConfirm]=useState("");

async function updatePassword(){

if(password!==confirm){
alert("Passwords do not match");
return;
}

const response = await fetch("http://localhost:8080/api/reset-password",{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email:email,
password:password
})

});

const data = await response.text();

if(data.includes("success")){
    alert("Password Updated Successfully");
    navigate("/login");
}else{
    alert(data);
}
}

return(

<div className="reset-bg">

<div className="reset-container">

<h2>Reset Password</h2>

<input
type="password"
placeholder="New Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<input
type="password"
placeholder="Confirm Password"
onChange={(e)=>setConfirm(e.target.value)}
/>

<button onClick={updatePassword}>
Update Password
</button>

<p className="forgot" onClick={()=>navigate("/login")}>
  Back to login..
</p>

</div>

</div>

);

}

export default ResetPassword;