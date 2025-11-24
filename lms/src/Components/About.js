import React from "react";

const About = () => {
  return (
    <div className="container-xxl py-5">
      <section className="about-section">

        <div className="about-container">

          <div className="about-left">
            <h2><span className="highlight">40+</span> Online Courses</h2>
            <h3>VWX B2B (OPC) PVT LTD</h3>
          </div>

          <div className="about-right">
            <h4 className="orange">About Us</h4>
            <h3>
              We are From Orange City Of India <span className="bold">NAGPUR</span>
            </h3>

            <ul>
              <li>40+ Online Courses</li>
              <li>With Certificate</li>
              <li>1 Year Validity</li>
              <li>सीखना है तो आज से शुरू कीजिए</li>
            </ul>
          </div>

        </div>

        {/* LOWER STATS */}
        <div className="statstwo">
          <div className="stat">
            <h3>1k+</h3>
            <p>Course Students</p>
          </div>

          <div className="stat">
            <h3>45+</h3>
            <p>Online Courses</p>
          </div>

          <div className="stat">
            <h3>12</h3>
            <p>Instructors</p>
          </div>

          <div className="stat">
            <h3>100%</h3>
            <p>Satisfaction</p>
          </div>
        </div>

      </section>
    </div>
  );
};

export default About;
