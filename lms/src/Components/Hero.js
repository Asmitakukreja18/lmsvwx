import React from "react";

const Hero = () => {
  return (
    <div className="container-fluid p-0 mb-4 bg-light" style={{ overflow: "hidden" }}>
      <div className="container py-5">
        <div className="row align-items-center text-center text-lg-start">

          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-3" style={{ color: "#3f5ffb" }}>
              40+ Courses Just ₹499/- Per Course
            </h5>
            <h1 className="display-5 fw-bold mb-3">
              Learn Anything, Anytime — Get Certified!
            </h1>

            <div className="promo-content mb-4">
              <h4>Get 40+ Online Courses JUST ₹499/- Per Course For 1 Year</h4>
              <p>🎓 Learn from experts, earn certificates, and upgrade your skills.</p>
              <p>🔥 Master Marketing, AI Tools, Ads, and more!</p>
            </div>

            <a className=" btn-primary py-md-3 px-md-5" href="/courses">Courses List</a>
          </div>

          <div className="col-lg-6 col-md-12 text-center">
            <img
              className="img-fluid rounded hero-img"
              src="https://fikinstitute.in/wp-content/uploads/2024/09/Untitled-design-4-1024x1024.png"
              alt="Online Courses"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
