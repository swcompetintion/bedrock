import React from "react";

const Node = (props) => {
  const { cx, cy, payload, handleClick } = props;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      style={{ cursor: "pointer" }}
      onClick={() => handleClick(payload)}
      onMouseOver={() => console.log("Custom Node Mouse over", payload)}
    />
  );
};

export default Node;
