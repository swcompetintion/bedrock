import React, { useState } from "react";
import { initialData } from "../../tests/DummyData";

const DataVisualizer = ({ children }) => {
  const [data] = useState(initialData);

  const handleClick = (item) => {
    alert(`Clicked on: ${item.name}`);
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { data, handleClick });
        }
        return child;
      })}
    </>
  );
};

export default DataVisualizer;
