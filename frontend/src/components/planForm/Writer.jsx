// src/components/planForm/Writer.jsx (경로 수정 가능)
import React, { useState } from "react";
import DataForm from "./DataForm"; // 기본 에디터 컴포넌트 임포트

const Writer = () => {
  // 쓰기 모드에서는 에디터 내용을 자체적으로 관리합니다. 초기값은 빈 문자열입니다.
  const [content, setContent] = useState("");

  // DataForm의 내용이 변경될 때 호출될 핸들러
  const handleContentChange = (value) => {
    setContent(value); // 상태 업데이트
    // 필요하다면 여기서 상위 컴포넌트로 변경된 내용을 전달할 수 있습니다.
    // 예: props.onContentChange(value);
  };

  // 저장 버튼 등의 로직은 여기에 추가될 수 있습니다.
  const handleSave = () => {
    console.log("저장할 내용:", content);
    // 서버로 content를 보내는 등의 저장 로직 구현
    alert("내용이 저장될 준비가 되었습니다. 콘솔을 확인하세요.");
  };

  return (
    <div>
      <h2>새 글 작성</h2>
      {/* DataForm을 렌더링하고, 현재 상태, 변경 핸들러, readOnly={false}를 전달 */}
      <DataForm
        value={content} // 현재 상태 값을 DataForm에 전달
        onChange={handleContentChange} // DataForm 내용 변경 시 호출될 함수 전달
        readOnly={false} // 편집 가능 모드
        style={{ height: "500px" }} // 에디터 높이 설정
      />
      <button onClick={handleSave} style={{ marginTop: "10px" }}>
        저장
      </button>
    </div>
  );
};

export default Writer;
