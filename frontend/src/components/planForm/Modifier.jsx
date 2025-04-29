// src/components/planForm/Modifier.jsx (경로 수정 가능)
import React, { useState, useEffect } from "react";
import DataForm from "./DataForm"; // 기본 에디터 컴포넌트 임포트

// Modifier 컴포넌트는 초기 내용을 initialContent props로 전달받습니다.
const Modifier = ({ initialContent = "" }) => {
  // 수정 모드에서는 초기 내용을 받아 자체 상태로 관리합니다.
  const [content, setContent] = useState(initialContent);

  // initialContent props가 변경될 때 (예: 다른 글을 수정하려고 할 때) 상태를 업데이트합니다.
  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]); // initialContent가 바뀔 때마다 실행

  // DataForm의 내용이 변경될 때 호출될 핸들러
  const handleContentChange = (value) => {
    setContent(value); // 상태 업데이트
    // 필요하다면 여기서 상위 컴포넌트로 변경된 내용을 실시간 전달할 수 있습니다.
    // 예: props.onContentChange(value);
  };

  // 수정 완료 또는 취소 버튼 등의 로직은 여기에 추가될 수 있습니다.
  const handleUpdate = () => {
    console.log("수정된 내용:", content);
    // 서버로 content를 보내는 등의 수정 로직 구현
    alert("내용이 수정될 준비가 되었습니다. 콘솔을 확인하세요.");
  };

  // const handleCancel = () => { /* ... 취소 로직 ... */ };

  return (
    <div>
      <h2>글 수정</h2>
      {/* DataForm을 렌더링하고, 현재 상태, 변경 핸들러, readOnly={false}를 전달 */}
      <DataForm
        value={content} // 현재 상태 값을 DataForm에 전달
        onChange={handleContentChange} // DataForm 내용 변경 시 호출될 함수 전달
        readOnly={false} // 편집 가능 모드
        style={{ height: "500px" }} // 에디터 높이 설정
      />
      <button onClick={handleUpdate} style={{ marginTop: "10px" }}>
        수정 완료
      </button>
      {/* <button onClick={handleCancel}>취소</button> */}
    </div>
  );
};

export default Modifier;
