import React from "react";

import Hero from "../Components/Hero";
import Categories from "../Components/Categories";
import Stats from "../Components/Stats";
import Courses from "../Components/Courses";
import About from "../Components/About";
import Launched from "../Components/Launched";

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Categories />
      <Courses />
      <About />
      <Launched />
    </>
  );
};

export default Home;
