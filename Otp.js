import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Otp.css";

function Otp() {

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes

  // TIMER
  useEffect(() => {

    if (!email) {
      alert("Invalid access. Please register again.");
      navigate("/register");
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {

        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;

      });
    }, 1000);

    return () => clearInterval(timer);

  }, [email, navigate]);

  // FORMAT TIMER
  const formatTime = () => {

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };


  // VERIFY OTP
  const verifyOtp = async () => {

    if (otp.length !== 6) {
      alert("Enter valid 6 digit OTP");
      return;
    }

    try {

      const response = await fetch("http://localhost:8080/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          otp: otp
        })
      });

      const data = await response.text();

      if (data.includes("Successfully")) {
        if(location.state?.type==="reset"){
navigate("/reset-password",{state:{email:email}});
}else{
alert("Registration Successful");
navigate("/login");
}

      } else {

        alert(data);

      }

    } catch (error) {

      alert("Server not reachable");

    }

  };


  // RESEND OTP
  const resendOtp = async () => {

    try {

      const response = await fetch("http://localhost:8080/api/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email
        })
      });

      const data = await response.text();

      alert(data);

      setTimeLeft(1200);

    } catch (error) {

      alert("Server error");

    }

  };


  return (

    <div className="otp-page">

      <div className="otp-container">

        <h2>Verify OTP</h2>

        <p>OTP sent to <b>{email}</b></p>

        <div className="timer">
          Time Left : {formatTime()}
        </div>

        <input
          type="text"
          placeholder="Enter 6 digit OTP"
          maxLength="6"
          className="otp-input"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button className="verify-btn" onClick={verifyOtp}>
          Verify OTP
        </button>

        <p className="resend-text">
          Didn't receive OTP?
          <span onClick={resendOtp}> Resend</span>
        </p>

      </div>

    </div>

  );
}

export default Otp;