import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DataForm = ({ value, onChange, readOnly = false, style }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div style={style || { height: "500px" }}>
      <ReactQuill
        theme={readOnly ? "bubble" : "snow"}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        modules={readOnly ? {} : modules}
        formats={formats}
        style={{
          height: style ? `${parseInt(style.height) - 50}px` : "450px",
        }}
      />
    </div>
  );
};

export default DataForm;
