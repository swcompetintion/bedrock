import React, { useState } from "react";
import ReactQuill from "react-quill"; // react-quill 컴포넌트 임포트
import "react-quill/dist/quill.snow.css"; // 또는 quill.bubble.css 등 에디터 테마 CSS 임포트

function DataForm() {
  // 에디터의 내용을 관리할 상태 (state)
  const [value, setValue] = useState("");

  return (
    <div style={{ height: "300px" }}>
      {" "}
      {/* 에디터 높이 설정 필요 */}
      <ReactQuill
        value={value} // 에디터에 표시할 내용
        onChange={setValue} // 내용이 변경될 때 호출될 함수
        style={{ height: "250px" }} // 에디터 실제 높이 설정
      />
    </div>
  );
}

export default DataForm;
