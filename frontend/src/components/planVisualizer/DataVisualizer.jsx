import React, { useState } from "react";
import { initialData } from "../../tests/DummyData";

const DataVisualizer = ({ children }) => {
  const [data, setData] = useState(initialData);
  const updateNodePosition = ({ id, x, y }) => {
    console.log(`DataVisualizer: 노드 ${id} 위치 업데이트 요청 (${x}, ${y})`);
    setData((currentData) =>
      currentData.map((item) =>
        item.id === id ? { ...item, x: x, y: y } : item
      )
    );
  };

  const handleClick = (item) => {
    alert(`Clicked on: ${item.name}`);
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            data,
            handleClick,
            onNodeDragEnd: updateNodePosition,
          });
        }
        return child;
      })}
    </>
  );
};

export default DataVisualizer;
