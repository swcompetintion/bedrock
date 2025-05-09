import { HTML5Backend } from "react-dnd-html5-backend";
import Editor from "../components/Editor";
import { DndProvider } from "react-dnd";
import React from "react";

const Workshop = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Editor />
    </DndProvider>
  );
};

export default Workshop;
