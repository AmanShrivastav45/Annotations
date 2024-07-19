import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import { IoClose } from "react-icons/io5";
import axiosInstance from "../utils/axios";

const AddEditNotes = ({ noteData, type, onClose, getAllNotes }) => {
  console.log(type)
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/api/addnote", {
        title,
        content,
      });
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;
    console.log(noteId)
    try {
      const response = await axiosInstance.put("/api/updatenote/" + noteId, {
        title,
        content,
      });
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = async () => {
    if (type === "add") {
      await addNewNote();
    } else {
      await editNote();
    }
  };

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
        <input
          maxLength={26}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
          className="Geist border w-full border-[#2A2A2A] caret-white placeholder:text-[#68686F] bg-[#09090B] focus:border-gray-300 px-4 outline-none h-12 text-base text-white rounded-[7px] flex items-center justify-center"
          required
        />
        <div className="flex flex-col mt-4 w-full">
          <Editor
            value={content}
            onChange={setContent}
            placeholder="Write your note here..."
          />
        </div>
        <div className="Geist w-full h-16 flex items-center justify-between">
          <div>{error && <div className="text-red-500 mt-4">{error}</div>}</div>
          <div>
            <button
              onClick={handleAddNote}
              className="mt-4 bg-yellow-600 hover:bg-yellow-500 text-white py-2 px-4 rounded"
            >
              {type === "add" ? "Add Note" : "Update Changes"}
            </button>
            <button
              onClick={onClose}
              className="mt-2 mx-2 ml-4 bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditNotes;


