import React from "react";

const Stats = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container text-center">
        
        <section className="stats">
          <div className="stat-box">
            <i className="fas fa-laptop"></i>
            <h3>40+</h3>
            <p>Online Courses</p>
          </div>

          <div className="stat-box">
            <i className="fas fa-user-tie"></i>
            <h3>200+</h3>
            <p>Instructors</p>
          </div>

          <div className="stat-box">
            <i className="fas fa-certificate"></i>
            <h3>100%</h3>
            <p>Certification</p>
          </div>

          <div className="stat-box">
            <i className="fas fa-users"></i>
            <h3>9k+</h3>
            <p>Membership</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Stats;
