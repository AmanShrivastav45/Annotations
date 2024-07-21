import React from "react";

const Loader = () => {
  return (
    <div style={{zIndex:10000}} className="fixed z-10 bg-[#0a0a0b] bg-opacity-80 top-0 left-0 w-full h-screen flex items-center justify-center">
      <div className="spinner-box">
        <div className="blue-orbit leo"></div>
        <div className="green-orbit leo"></div>
        <div className="red-orbit leo"></div>
        <div className="white-orbit w1 leo"></div>
        <div className="white-orbit w2 leo"></div>
        <div className="white-orbit w3 leo"></div>
      </div>
    </div>
  );
};

export default Loader;
