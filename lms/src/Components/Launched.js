import React from "react";

const Launched = () => {
  return (
    <div className="container-xxl mt-5">
      <section className="launched-section">

        <p className="sub-heading">Upcoming Courses</p>
        <h2 className="main-heading">Courses Launched</h2>

        <div className="launched-grid">

          <div className="launch-card">
            <img src="https://vwxb2bonlinecourse.in/wp-content/uploads/2025/09/word-1.png" alt="Word" />
            <h3>1 Year Word Course</h3>
            <p className="price">499/- With Certificate</p>
          </div>

          <div className="launch-card">
            <img src="https://vwxb2bonlinecourse.in/wp-content/uploads/2025/09/excel-1.png" alt="Excel" />
            <h3>1 Year Excel Course</h3>
            <p className="price">499/- With Certificate</p>
          </div>

          <div className="launch-card">
            <img src="https://vwxb2bonlinecourse.in/wp-content/uploads/2025/09/ai-1.png" alt="AI" />
            <h3>1 Year AI Course</h3>
            <p className="price">499/- With Certificate</p>
          </div>

          <div className="launch-card">
            <img src="https://vwxb2bonlinecourse.in/wp-content/uploads/2025/09/french.png" alt="French" />
            <h3>1 Year French Course</h3>
            <p className="price">499/- With Certificate</p>
          </div>

        </div>

      </section>
    </div>
  );
};

export default Launched;
