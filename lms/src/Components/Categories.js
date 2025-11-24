import React from "react";

const Categories = () => {
  return (
    <section className="course-categories">
      <div className="container">
        <h2>Course Categories</h2>
        <p>40+ Online Courses To Increase Your Skills</p>

        <div className="categories-grid">

          <div className="category-card blue">
            <div className="icon-circle">
              <img
                src="https://techwingz.com/wp-content/uploads/2024/09/Cat-1-5.png"
                alt="Skill Icon"
              />
            </div>
            <h3>Skill Development</h3>
          </div>

          <div className="category-card yellow">
            <div className="icon-circle">
              <img
                src="https://i0.wp.com/nationalolympiads.com/wp-content/uploads/2024/05/All-Icons-1.png?fit=305%2C305&ssl=1"
                alt="AI Icon"
              />
            </div>
            <h3>Learn AI</h3>
          </div>

          <div className="category-card green">
            <div className="icon-circle">
              <img
                src="https://nargund.edu.in/wp-content/uploads/2024/08/All-Icons-3.png"
                alt="Language Icon"
              />
            </div>
            <h3>Learn Languages</h3>
          </div>

          <div className="category-card lime">
            <div className="icon-circle">
              <img
                src="https://i0.wp.com/nationalolympiads.com/wp-content/uploads/2024/05/All-Icons-2.png?fit=305,305&ssl=1"
                alt="Office Icon"
              />
            </div>
            <h3>Learn Microsoft Office</h3>
          </div>

          <div className="category-card purple">
            <div className="icon-circle">
              <img
                src="https://parmaarclasses.in/wp-content/uploads/2024/10/All-Icons-7.png"
                alt="Marketing Icon"
              />
            </div>
            <h3>Learn Marketing</h3>
          </div>

          <div className="category-card cyan">
            <div className="icon-circle">
              <img
                src="https://parmaarclasses.in/wp-content/uploads/2024/10/All-Icons-4.png"
                alt="Chat GPT Icon"
              />
            </div>
            <h3>Learn Chat GPT</h3>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Categories;
