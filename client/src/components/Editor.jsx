import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ placeholder, value, onChange }) => {
  const [content, setContent] = useState(value || "");

  useEffect(() => {
    if (content !== value) {
      setContent(value);
    }
  }, [value, content]);

  const handleChange = (value) => {
    setContent(value);
    onChange(value);
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "formula"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ header: [1, 2, 3, false] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      value={content}
      onChange={handleChange}
      placeholder={placeholder}
      className="custom-quill Geist"
    />
  );
};

export default Editor;
