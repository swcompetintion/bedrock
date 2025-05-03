import React, { useState } from "react";
import { initialData } from "../../tests/DummyData";

const DataVisualizer = ({ children }) => {
  const [data, setData] = useState(initialData);

  const updateNodePosition = ({ id, x, y }) => {
    if (id) {
      console.log(x + " " + y + " " + id);
      setData((currentData) => {
        const updatedData = currentData.map((item) =>
          item.id === id ? { ...item, x: x, y: y } : item
        );

        updatedData.sort((a, b) => {
          if (a.x !== b.x) {
            return a.x - b.x;
          } else {
            return a.y - b.y;
          }
        });
        console.log(id + " " + x + " " + y);

        return updatedData;
      });
    }
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
