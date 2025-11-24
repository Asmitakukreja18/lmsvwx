import React from "react";
import "./Contact.css"; 

const Contact = () => {
  return (
    <>
      <section className="hero">
        <h1>Contact Us</h1>
        <p>VWX B2B OPC PVT LTD</p>
      </section>

      <section className="contact-section">
        <div className="location">NAGPUR</div>
        <h2>LET'S GET IN TOUCH</h2>

        <div className="contact-box">
          <h3>OUR CONTACT</h3>

          <div className="contact-item">
            <div className="icon">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div>
              <p className="label">Email Address</p>
              <p className="info">support@vwxb2bonlinecourse.in</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="icon">
              <i className="fa-solid fa-phone"></i>
            </div>
            <div>
              <p className="label">Call Us</p>
              <p className="info">+91 7420847887</p>
            </div>
          </div>
        </div>

        {/* ADDRESS */}
        <div className="address-box">
          <h3>ADDRESS :</h3>
          <p>S3 3RD Floor Mahalaxmi Apartment</p>
          <p>Narendra Nagar Nagpur</p>
          <p>Pin Code : 440015</p>
          <p>Maharashtra</p>
          <p>India</p>
        </div>
      </section>

      {/* WHATSAPP FLOAT */}
      <a
        href="https://wa.me/917420847887"
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  );
};

export default Contact;
