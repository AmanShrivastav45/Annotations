import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

const ViewNote = ({ title,noteContent, onClose }) => {
  return (
    <div className="absolute top-0 left-0  h-full w-full bg-black bg-opacity-75 flex items-center justify-center">
      <div className="relative w-[95%] 2xl:w-[1440px] h-[98%] sm:h-[90%] md:h-[75%] p-4 md:px-6 border border-[#2a2a2a] bg-[#09090b] bg-opacity-75 rounded-[10px] flex flex-col items-center">
        <button className="absolute top-5 right-5 text-white text-2xl" onClick={onClose}>
          <IoClose />
        </button>
        <h1 className="text-white text-3xl Geist-semibold text-left w-full px-4 my-4">{title}</h1>
        <div id="#style-11"
          className="outline-none bg-transparent  text-white w-full h-full p-4 text-lg overflow-y-auto Geist leading-relaxed"
          dangerouslySetInnerHTML={{ __html: noteContent }}
        />
      </div>
    </div>
  );
};

export default ViewNote;