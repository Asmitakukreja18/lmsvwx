import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'

const Footer = () => {
return (
<footer className="footer">
<div className="footer-container">
<div className="footer-column about">
<p>
Learn Anytime, Anything & from Anywhere at your own Schedule.<br />
Happy Learning!
</p>


<p>
<strong>Company Name :</strong><br />
<a href="#">VWX B2B OPC PVT LTD</a><br />
Address : S3 3rd Floor | Mahalaxmi Building | Narendra Nagar |<br />
Nagpur 440015 | Maharashtra, India<br />
Contact No : +91 7420847887
</p>
</div>

<div className="footer-column">
  <h3 className="footer-heading">Quick Links</h3>
  <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/about">About</Link></li>
    <li><Link to="/courses">Courses</Link></li>
    <li><Link to="/contact">Contact Us</Link></li>
    <li><Link to="/privacy-policy">Privacy Policy</Link></li>
    <li><Link to="/terms-and-conditions">Terms and Conditions</Link></li>
    <li><Link to="/refund-policy">Refund Policy</Link></li>
  </ul>
</div>

<div className="footer-column">
  <h3 className="footer-heading">Categories</h3>
  <ul>
    <li><a>English</a></li>
    <li><a>Digital Marketing</a></li>
  </ul>
</div>

<div className="footer-column">
  <h3 className="footer-heading">Account</h3>
  <ul>
    <li><Link to="/register">Student Registration</Link></li>
    <li><Link to="/login">Student Login</Link></li>
  </ul>
</div></div>


<div className="footer-bottom">
<p>Copyright © 2025 VWX B2B (OPC) PVT LTD. All Rights Reserved.</p>
</div>
</footer>
);
};


export default Footer;