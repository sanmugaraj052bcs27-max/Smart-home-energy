import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import phoneImage from "./home.jpg";

function Home() {

  const navigate = useNavigate();

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home-page">

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="logo">
          <i className="fas fa-home logo-icon"></i>
          SmartHome
        </div>

        <ul className="nav-links">
  <li onClick={() => scrollTo("home")}>Home</li>
  <li onClick={() => scrollTo("about")}>About</li>
  <li onClick={() => scrollTo("services")}>Services</li>
  <li onClick={() => scrollTo("howitworks")}>How it Works</li>
  <li onClick={() => scrollTo("faq")}>FAQs</li>
  <li onClick={() => scrollTo("testimonials")}>Testimonials</li>
  <li onClick={() => scrollTo("contact")}>Contact</li>
</ul>

        <div style={{ marginRight: "80px" }}>

  <button
    className="login-btn"
    onClick={() => navigate("/login")}
  >
    Login
  </button>

  <button
    className="signup-btn"
    onClick={() => navigate("/signup")}
  >
    Signup
  </button>

</div>

      </nav>


      {/* HERO */}
      <section id="home" className="hero">

        <div className="hero-left">

          <h1>
            Smart Home <br />
            Energy Management System
          </h1>

          <p>
            Our system allows users to monitor, control and optimize home
            energy consumption. It helps reduce electricity bills and improves
            efficiency using smart automation.
          </p>

          <button className="start-btn">
            Get Started
          </button>

          {/* PLAY STORE */}
          <div className="download-section">

            <p>Where you can get this app</p>

            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Play Store"
              className="playstore"
            />

          </div>

        </div>


        {/* IMAGE RIGHT */}
        <div className="hero-right">

          <div className="circle"></div>

          <img
            src={phoneImage}
            alt="Smart Home"
            className="phone"
          />

        </div>

      </section>


      {/* ABOUT */}
      <section id="about" className="section">

        <h2>About Us</h2>

        <div className="about-box">

          <p>
            SmartHome Energy Management System is designed to provide
            intelligent monitoring and automation of household appliances.
            Our system enables users to control devices remotely, monitor
            energy consumption, and receive real-time alerts.
          </p>

          <p>
            This platform improves energy efficiency, enhances security,
            and helps users save electricity costs through smart automation.
          </p>

          <p>
            Our goal is to build a smarter, safer, and energy-efficient future.
          </p>

        </div>

      </section>


      {/* SERVICES */}
      <section id="services" className="section light">

        <h2>Our Services</h2>

        <div className="services-container">

          <div className="service-card">

            <i className="fas fa-bolt service-icon"></i>

            <h3>Energy Monitoring</h3>

            <p>
              Track real-time electricity usage and reduce wastage.
            </p>

          </div>


          <div className="service-card">

            <i className="fas fa-mobile-alt service-icon"></i>

            <h3>Remote Control</h3>

            <p>
              Control lights, fans and devices remotely.
            </p>

          </div>


          <div className="service-card">

            <i className="fas fa-chart-line service-icon"></i>

            <h3>Analytics</h3>

            <p>
              View detailed energy consumption reports.
            </p>

          </div>


          <div className="service-card">

            <i className="fas fa-shield-alt service-icon"></i>

            <h3>Security Alerts</h3>

            <p>
              Get instant alerts for unusual activity.
            </p>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
<section id="howitworks" className="section">

  <h2>How It Works</h2>

  <div className="services-container">

    <div className="service-card">
      <i className="fas fa-user-plus service-icon"></i>
      <h3>1. Register Account</h3>
      <p>
        First, create your SmartHome account using Signup page.
        Provide your basic details like name, email and password.
      </p>
    </div>

    <div className="service-card">
      <i className="fas fa-sign-in-alt service-icon"></i>
      <h3>2. Login to System</h3>
      <p>
        Login using your registered email and password.
        Access your personal SmartHome dashboard securely.
      </p>
    </div>

    <div className="service-card">
      <i className="fas fa-home service-icon"></i>
      <h3>3. Add Room & Devices</h3>
      <p>
        Enter your room details and connect your smart devices
        like lights, fans, AC and other appliances.
      </p>
    </div>

    <div className="service-card">
      <i className="fas fa-chart-bar service-icon"></i>
      <h3>4. Monitor Energy</h3>
      <p>
        Track your electricity usage, control devices remotely
        and optimize energy consumption efficiently.
      </p>
    </div>

  </div>

</section>


      {/* FAQ */}
      <section id="faq" className="section">

        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">

          <p><b>1. How can I use this app?</b><br/>
          You can install the app from Play Store, register your account,
          connect your devices and start monitoring.</p>

          <p><b>2. Is the system secure?</b><br/>
          Yes, it uses secure authentication and encryption.</p>

          <p><b>3. Can I control devices remotely?</b><br/>
          Yes, you can control devices from anywhere.</p>

          <p><b>4. Does it save electricity?</b><br/>
          Yes, it helps reduce electricity consumption.</p>

          <p><b>5. Is it easy to use?</b><br/>
          Yes, the interface is simple and user-friendly.</p>

        </div>

      </section>

      {/* TESTIMONIALS */}
<section id="testimonials" className="section">

  <h2>What Our Users Say</h2>

  <div className="services-container">

    <div className="service-card">

      <i className="fas fa-user-circle service-icon"></i>

      <h3>Rahul Kumar</h3>

      <p>
        This SmartHome system helped me reduce my electricity bill by 30%.
        I can monitor everything easily from my phone.
      </p>

      <p><b>★★★★</b></p>

    </div>


    <div className="service-card">

      <i className="fas fa-user-circle service-icon"></i>

      <h3>Priya Sharma</h3>

      <p>
        Very easy to use and user-friendly interface.
        Remote control feature is very useful.
      </p>

      <p><b>★★★★★</b></p>

    </div>


    <div className="service-card">

      <i className="fas fa-user-circle service-icon"></i>

      <h3>Arun Singh</h3>

      <p>
        Real-time monitoring and alerts help me save energy.
        Highly recommended SmartHome solution.
      </p>

      <p><b>★★★★★</b></p>

    </div>


    <div className="service-card">

      <i className="fas fa-user-circle service-icon"></i>

      <h3>Sneha Patel</h3>

      <p>
        Best energy management system. Dashboard and analytics
        are very clear and helpful.
      </p>

      <p><b>★★★★</b></p>

    </div>

  </div>

</section>


      {/* CONTACT */}
      <section id="contact" className="section light">

        <h2>Contact Us</h2>

        <div className="contact-container">


          {/* CONTACT INFO */}
          <div className="contact-info">

            <p>
              <i className="fas fa-envelope"></i>
              smarthome@gmail.com
            </p>

            <p>
              <i className="fab fa-facebook"></i>
              SmartHome Official
            </p>

            <p>
              <i className="fab fa-instagram"></i>
              @smarthome_energy
            </p>

            <p>
              <i className="fab fa-youtube"></i>
              SmartHome Channel
            </p>

          </div>


          {/* CONTACT FORM */}
          <div className="contact-form">

            <input type="text" placeholder="Your Name" />

            <input type="email" placeholder="Your Email" />

            <textarea placeholder="Your Message"></textarea>

            <button className="send-btn">
              Send Message
            </button>

          </div>


        </div>

      </section>


      {/* FOOTER */}
      <footer className="footer">

        © 2026 SmartHome | All Rights Reserved

      </footer>


    </div>
  );
}

export default Home;