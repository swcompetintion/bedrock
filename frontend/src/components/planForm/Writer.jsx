import React, { useState } from "react";
import DataForm from "./DataForm";

const Writer = () => {
  const [content, setContent] = useState("");

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSave = () => {
    console.log("저장할 내용:", content);

    alert("내용이 저장될 준비가 되었습니다. 콘솔을 확인하세요.");
  };

  return (
    <div>
      <h2>새 글 작성</h2>

      <DataForm
        value={content}
        onChange={handleContentChange}
        readOnly={false}
        style={{ height: "500px" }}
      />
      <button onClick={handleSave} style={{ marginTop: "10px" }}>
        저장
      </button>
    </div>
  );
};

export default Writer;
