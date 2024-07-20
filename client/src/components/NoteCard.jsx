import React, { useState, useEffect } from "react";
import { TiPin } from "react-icons/ti";
import { MdEdit, MdDelete } from "react-icons/md";
import moment from "moment";
import DeleteNote from "../modals/DeleteNote";

const NoteCard = ({
  title,
  date,
  content,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
  onViewNote,
}) => {
  const [plainTextContent, setPlainTextContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false); // state to control the delete modal


  const handleViewNote = () => {
    onViewNote({ title, content });
  };

  const onClearSearch = () => {
    setSearchQuery("");
  };

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    const plainText = stripHtmlTags(content);
    setPlainTextContent(plainText);
  }, [content]);

  const handleDeleteNote = () => {
    onDelete(); 
    setShowDeleteModal(false); 
  };

  return (
    <div className="Geist bg-[#0A0A0A] border  border-[#1e1e1e] hover:bg-[#121212] transition-all shadow-[#121212] hover:shadow-md h-[180px] w-full rounded-[8px] p-6 py-3 flex flex-col justify-between">
      <div className="flex flex-col w-full overflow-hidden">
        <div className="h-8 w-full flex items-center justify-between mb-1">
          <div className="flex items-center">
            <div className="h-5 w-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[50%]"></div>
            <button onClick={handleViewNote}>
              <h1 className="Geist text-base text-white ml-3">
                {title?.slice(0, 25)}{ title.length > 25 ? <span>...</span> : <span></span>}
              </h1>
            </button>
          </div>
          <div className="flex items-center">
            <button onClick={onPinNote}>
              <TiPin
                className={`text-[#68686f] hover:text-gray-100 text-2xl ml-3 ${
                  isPinned ? "text-yellow-600" : ""
                }`}
              />
            </button>
          </div>
        </div>
        <div>
          <button onClick={handleViewNote} className="text-left">
            <p
              className="Geist text-[#3a3a3a] whitespace-normal break-words overflow-hidden"
              style={{
                wordBreak: "break-word",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {plainTextContent?.slice(0, 100)}<span>...</span>
            </p>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-[#68686f]">
          {moment(date).format("DD MMM, YYYY")}
        </div>
        <div>
          <button onClick={onEdit} type="edit">
            <MdEdit className="text-[#68686f] hover:text-gray-100 text-xl" />
          </button>
          <button onClick={() => setShowDeleteModal(true)}>
            <MdDelete className="text-[#68686f] hover:text-gray-100 text-xl ml-4" />
          </button>
        </div>
      </div>
      {showDeleteModal && (
        <DeleteNote
          onDeleteNote={handleDeleteNote}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default NoteCard;
