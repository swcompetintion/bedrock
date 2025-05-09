import React from "react";
import { DndProvider } from "react-dnd"; // <-- DndProvider를 이름 있는 임포트로 사용 (중괄호 { } 사용)
import { HTML5Backend } from "react-dnd-html5-backend";
import Editor from "../components/Editor";
const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Editor />
    </DndProvider>
  );
};

export default App;
