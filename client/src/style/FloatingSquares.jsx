import React from "react";

const AnimatedBackground = () => {
  return (
    <div className="z-[1] absolute w-full h-full overflow-hidden">
      <ul className="circles absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(10)].map((_, index) => (
          <li
            key={index}
            className={`circle circle-${index + 1}`}
            style={getCircleStyle(index + 1)}
          ></li>
        ))}
      </ul>
    </div>
  );
};

const getCircleStyle = (index) => {
  const commonStyle = {
    position: "absolute",
    display: "block",
    listStyle: "none",
    background: "linear-gradient(to bottom, #2a2a2a, #68686f)",
    opacity: "2%",
    animation: "animate 25s linear infinite",
    bottom: "-150px",
  };

  const specificStyles = [
    { left: "25%", width: "80px", height: "80px", animationDelay: "0s" },
    {
      left: "10%",
      width: "20px",
      height: "20px",
      animationDelay: "2s",
      animationDuration: "12s",
    },
    { left: "70%", width: "20px", height: "20px", animationDelay: "4s" },
    {
      left: "40%",
      width: "60px",
      height: "60px",
      animationDelay: "0s",
      animationDuration: "18s",
    },
    { left: "65%", width: "20px", height: "20px", animationDelay: "0s" },
    { left: "75%", width: "110px", height: "110px", animationDelay: "3s" },
    { left: "35%", width: "150px", height: "150px", animationDelay: "7s" },
    {
      left: "50%",
      width: "25px",
      height: "25px",
      animationDelay: "15s",
      animationDuration: "45s",
    },
    {
      left: "20%",
      width: "15px",
      height: "15px",
      animationDelay: "2s",
      animationDuration: "35s",
    },
    {
      left: "85%",
      width: "150px",
      height: "150px",
      animationDelay: "0s",
      animationDuration: "11s",
    },
  ];

  return { ...commonStyle, ...specificStyles[index - 1] };
};

const styles = `
@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.1;
    border-radius: 0;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}
`;

const FloatingSquares = () => (
  <>
    <style>{styles}</style>
    <AnimatedBackground />
  </>
);

export default FloatingSquares;
