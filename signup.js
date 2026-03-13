import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./signup.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    interest: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const validate = () => {

    if (form.name.length < 3)
      return "Name must be at least 3 characters";

    if (!form.email.includes("@"))
      return "Email must contain @";

    if (form.address.length < 10)
      return "Address must be minimum 10 characters";

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(form.password))
      return "Password must contain uppercase, lowercase, number and special character";

    if (form.password !== form.confirmPassword)
      return "Passwords do not match";

    return "";
  };


 const handleSubmit = async (e) => {

  e.preventDefault();

  const validationError = validate();

  if (validationError) {
    setError(validationError);
    return;
  }

  setError("");

  try {

    const response = await fetch("http://localhost:8080/api/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        gender: form.gender,
        address: form.address,
        interest: form.interest,
        password: form.password
      })
    });
    

    if (response.ok) {

      // Go to OTP page
      navigate("/otp", { state: { email: form.email } });

    } else {
      alert("Failed to send OTP");
    }

  } catch (error) {
    alert("Server not reachable");
  }

};

  return (

    <div className="signup-page">

      <div className="signup-container">


        {/* LEFT SIDE */}

        <div className="left-panel">

          <h2>Smart Home Energy Management</h2>

          <p>
            Monitor and optimize your home energy usage efficiently.
          </p>

          <ul>
            <li>Energy Monitoring</li>
            <li>Electricity Bill Tracking</li>
            <li>Energy Saving Recommendations</li>
            <li>Smart Automation Support</li>
          </ul>

        </div>


        {/* RIGHT SIDE FORM */}

        <div className="right-panel">

          <h2><center>Create Account</center></h2>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>


            <label>Full Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              required
            />


            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
            />


            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              required
            />


            <label>Gender</label>

            <div className="gender">

              <label>
                <input type="radio" name="gender" value="Male"
                  onChange={handleChange} /> Male
              </label>

              <label>
                <input type="radio" name="gender" value="Female"
                  onChange={handleChange} /> Female
              </label>

              <label>
                <input type="radio" name="gender" value="Other"
                  onChange={handleChange} /> Other
              </label>

            </div>


            <label>Address</label>
            <textarea
              name="address"
              onChange={handleChange}
              required
            ></textarea>


            <label>Primary Interest</label>
            <select name="interest"
              onChange={handleChange}
              required>

              <option value="">Select</option>
              <option>Energy Monitoring</option>
              <option>Automation</option>
              <option>Security</option>

            </select>


            {/* Password */}

            <label>Password</label>

            <div className="password-box">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                required
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="eye"
              >
                👁
              </span>

            </div>


            {/* Confirm Password */}

            <label>Confirm Password</label>

            <div className="password-box">

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                onChange={handleChange}
                required
              />

              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="eye"
              >
                👁
              </span>

            </div>


            <button type="submit">Register</button>

            <p style={{ marginTop: "10px" }}><center>Already registered? <Link to="/login">Login here</Link></center></p>


          </form>

        </div>

      </div>

    </div>

  );

}

export default Signup;