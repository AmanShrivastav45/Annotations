import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import { IoClose } from "react-icons/io5";
import axiosInstance from "../utils/axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";


const AddEditNotes = ({ noteData, type, onClose, getAllNotes }) => {
  console.log(type)
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const addNewNote = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/addnote", {
        title,
        content,
      });
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
      toast.success("Note added successfully")
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message)
        setError(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;
    console.log(noteId)
    setLoading(true);
    try {
      const response = await axiosInstance.put("/api/updatenote/" + noteId, {
        title,
        content,
      });
      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
      toast.success("Note updated successfully")
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message)
        setError(error.response.data.message);
      }
    }finally {
      setLoading(false);
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
    <div  style={{ zIndex: 1000 }} className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-75 flex items-center justify-center">
      <div className="relative w-[95%] 2xl:w-[1440px] p-4 md:px-6 border border-[#2a2a2a] bg-opacity-75 bg-black rounded-[10px] flex flex-col items-center">
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
          maxLength={100}
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
      {loading && <Loader/>}
    </div>
  );
};

export default AddEditNotes;


