import React, { useState } from "react";
import { initialData } from "../../tests/DummyData";
const DataVisualizer = ({ children }) => {
  const [data, setData] = useState(initialData);

  const updateNodePosition = ({ id, x, y }) => {
    console.log(`DataVisualizer: 노드 ${id} 위치 업데이트 요청 (${x}, ${y})`);

    const numX = parseFloat(x);
    const numY = parseFloat(y);

    if (isNaN(numX) || isNaN(numY)) {
      console.error(`Invalid position data for node ${id}: x=${x}, y=${y}`);
      return;
    }

    setData((currentData) => {
      const updatedData = currentData.map((item) =>
        item.id === Number(id) ? { ...item, x: numX, y: numY } : item
      );

      const sortedData = updatedData.slice().sort((a, b) => {
        const ax = parseFloat(a.x);
        const bx = parseFloat(b.x);
        const ay = parseFloat(a.y);
        const by = parseFloat(b.y);

        if (ax !== bx) {
          return ax - bx;
        } else {
          return ay - by;
        }
      });

      console.log(
        `Attempting to update id: ${id}, new x: ${numX}, new y: ${numY}`
      );
      console.log("Updated and Sorted Data (to be set):", updatedData);
      localStorage.removeItem("id");

      return sortedData;
    });
  };

  const handleClick = (item) => {
    alert(`Clicked on: ${item.name} (ID: ${item.id})`);
    console.log("Clicked item data:", item);
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
