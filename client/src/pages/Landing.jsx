import React from "react";
import Astronaut from "../style/Astronaut";
import Loader from "../components/Loader";

const Landing = () => {
  return (
    <div className="h-screen w-screen flex items-start justify-center bg-[#2a2a2a]">
      <Loader/>
      <h1 className="Geist text-white text-2xl mt-24 ">Welcome to Annotations!</h1>
    </div>
  );
};

export default Landing;
