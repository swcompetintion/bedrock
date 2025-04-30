import React, { useState, useEffect } from "react";
import DataForm from "./DataForm";

const Modifier = ({ initialContent = "" }) => {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleUpdate = () => {
    console.log("수정된 내용:", content);
    alert("내용이 수정될 준비가 되었습니다. 콘솔을 확인하세요.");
  };

  return (
    <div>
      <h2>글 수정</h2>

      <DataForm
        value={content}
        onChange={handleContentChange}
        readOnly={false}
        style={{ height: "500px" }}
      />
      <button onClick={handleUpdate} style={{ marginTop: "10px" }}>
        수정 완료
      </button>
    </div>
  );
};

export default Modifier;
