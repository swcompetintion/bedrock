import { HTML5Backend } from "react-dnd-html5-backend"; // 마우스로 끌기 지원
import Editor from "../components/View/Editor";
import { DndProvider } from "react-dnd"; // React용 드래그 앤 드롭 라이브러리
import React from "react";

const Workshop = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Editor />
    </DndProvider>
  );
};

export default Workshop;
