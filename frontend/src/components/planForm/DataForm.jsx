// src/components/planForm/DataForm.jsx (경로 수정 가능)
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // 에디터 기본 스타일 임포트

// 이 컴포넌트는 ReactQuill을 렌더링하고
// 필요한 props (value, onChange, readOnly, style)를 받아 ReactQuill에 전달합니다.
// 자체적으로 상태를 관리하지 않고, 부모로부터 제어받는 형태입니다.
const DataForm = ({ value, onChange, readOnly = false, style }) => {
  // ReactQuill의 툴바 및 포맷 설정을 정의합니다.
  // 필요하다면 이 설정들도 props로 외부에서 받아오도록 할 수 있습니다.
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }], // 헤더 크기 선택
      ["bold", "italic", "underline", "strike", "blockquote"], // 기본 서식
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ], // 리스트 및 들여쓰기
      ["link", "image"], // 링크, 이미지 삽입
      ["clean"], // 서식 제거
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
      {" "}
      {/* 전달받은 style을 적용하거나 기본 높이 사용 */}
      <ReactQuill
        theme={readOnly ? "bubble" : "snow"} // 읽기 전용 모드에서는 툴바 없는 bubble 테마 사용 고려 (선택 사항)
        value={value} // 부모로부터 받은 value를 표시
        onChange={onChange} // 부모로부터 받은 onChange 핸들러 연결
        readOnly={readOnly} // 부모로부터 받은 readOnly 상태 적용
        modules={readOnly ? {} : modules} // 읽기 전용 시 툴바 숨김 (선택 사항)
        formats={formats} // 포맷 적용
        style={{ height: style ? `${parseInt(style.height) - 50}px` : "450px" }} // 컨테이너 높이 고려하여 에디터 본문 높이 설정
      />
    </div>
  );
};

export default DataForm;
