import React, { useState, useEffect } from "react";
import Astronaut from "../style/Astronaut";
import Loader from "../components/Loader";
import "../fonts/stylesheet.css";
import { Link } from "react-router-dom";
import FloatingSquares from "../style/FloatingSquares";
import Example from "../style/Example";

const Landing = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-start bg-[#0a0a0a]">
      <div
        style={{ zIndex: 10 }}
        className="flex items-start justify-center h-[25%] sm:h-[30%]  w-full"
      ></div>
      <div
        style={{ zIndex: 10 }}
        className="h-[40%] w-full flex flex-col items-center justify-center  gap-4"
      >
        <h1
          style={{ zIndex: 11 }}
          className=" Apercu-Bold text-white text-center text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
        >
          ANNOTATIONS
          <p className="md:text-base lg:text-xl px-8 sm:px-2  mt-3 text-sm Geist text-center text-[#68686f]">
            Effortlessly capture and organize your thoughts, ideas, and tasks
            with our intuitive notes app.
          </p>
        </h1>
        <div className="flex gap-8">
          <Link
            to="/signup"
            className="h-12 w-[125px] bg-[#2a2a2a] text-gray-100 flex items-center justify-center Geist px-2 text-xl rounded-[7px]"
          >
            Signup
          </Link>
          <Link
            to="/login"
            className="h-12 w-[125px] flex items-center justify-center Geist px-2 text-xl bg-yellow-400 rounded-[7px]"
          >
            Try
          </Link>
        </div>
      </div>
      <div></div>
      <Example />
      <h1 className="fixed bottom-5 Geist text-[#3a3a3a]">
        made by <span className="text-[#68686f]">Aman Shrivastav</span>
      </h1>
      <FloatingSquares />
    </div>
  );
};

export default Landing;
