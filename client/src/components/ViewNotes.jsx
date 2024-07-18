import React from 'react'

const ViewNotes = () => {
  return (
    <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-75 flex items-center justify-center">
      <div className="relative w-[95%] 2xl:w-[1440px] p-4 md:px-6 border border-[#2a2a2a] bg-black rounded-[10px] flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white text-2xl"
        >
          <IoClose />
        </button>
        <div className="my-4 ml-2 text-2xl lg:text-3xl w-full Geist-semibold text-white flex justify-between items-center">
          <h1>{type === "add" ? "Create a new note!" : "Edit note"}</h1>
        </div>
        <textarea>
            
        </textarea>
        
      </div>
    </div>
  )
}

export default ViewNotes