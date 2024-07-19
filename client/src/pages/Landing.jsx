import React, { useState, useEffect } from "react";
import Astronaut from "../style/Astronaut";
import Loader from "../components/Loader";

const Landing = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="h-screen w-screen flex items-start justify-center bg-black">
      {loading? (
        <Loader />
      ) : (
        <div
          className="fade-in"
          style={{
            opacity: loading? 0 : 1,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <h1 className="Geist text-white text-2xl mt-24 ">
            Welcome to Annotations!
          </h1>
          {/* Add more content here */}
        </div>
      )}
    </div>
  );
};

export default Landing;