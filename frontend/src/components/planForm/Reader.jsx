// src/components/planForm/Reader.jsx (경로 수정 가능)
import React from "react";
import DataForm from "./DataForm"; // 기본 에디터 컴포넌트 임포트

// Reader 컴포넌트는 표시할 내용을 props로 전달받습니다.
const Reader = ({ content = "<p>읽어올 내용이 없습니다.</p>" }) => {
  // 읽기 모드는 내용을 수정하지 않으므로 자체 상태 관리가 필요 없습니다.
  // 전달받은 content prop을 DataForm에 전달하여 표시만 합니다.

  return (
    <div>
      <h2>글 내용 읽기</h2>
      {/* DataForm을 렌더링하고, 전달받은 content, readOnly={true}를 전달 */}
      <DataForm
        value={content} // 표시할 내용을 DataForm에 전달
        onChange={() => {}} // 읽기 전용이므로 onChange는 빈 함수 전달 또는 생략 가능
        readOnly={true} // 읽기 전용 모드
        style={{ height: "500px" }} // 에디터 높이 설정
      />
    </div>
  );
};

export default Reader;
