import React, { useState, useEffect, useRef } from "react";

const Node = (props) => {
  const { cx, cy, payload, handleClick } = props;
  const [currentPos, setCurrentPos] = useState({ x: cx, y: cy });
  const [isDragging, setIsDragging] = useState(false);

  const [isHidden, setIsHidden] = useState(false);

  const startClientPosRef = useRef({ x: 0, y: 0 });
  const startNodePosRef = useRef({ x: cx, y: cy });
  const totalDragDeltaRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setCurrentPos({ x: cx, y: cy });
    startNodePosRef.current = { x: cx, y: cy };
    totalDragDeltaRef.current = { x: 0, y: 0 };

    setIsHidden(false);
  }, [cx, cy]);

  const handleMouseDown = (e) => {
    setIsDragging(true);

    startClientPosRef.current = { x: e.clientX, y: e.clientY };
    startNodePosRef.current = { x: currentPos.x, y: currentPos.y };
    totalDragDeltaRef.current = { x: 0, y: 0 };
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startClientPosRef.current.x;
    const deltaY = e.clientY - startClientPosRef.current.y;

    setCurrentPos((prevPos) => ({
      x: prevPos.x + deltaX,
      y: prevPos.y + deltaY,
    }));

    totalDragDeltaRef.current = {
      x: totalDragDeltaRef.current.x + deltaX,
      y: totalDragDeltaRef.current.y + deltaY,
    };

    startClientPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    localStorage.setItem("id", payload.id);

    const movedDistance = Math.sqrt(
      Math.pow(totalDragDeltaRef.current.x, 2) +
        Math.pow(totalDragDeltaRef.current.y, 2)
    );

    const clickThreshold = 5;

    if (movedDistance < clickThreshold) {
      if (handleClick) {
        handleClick(payload);
      }

      setCurrentPos({ x: cx, y: cy });
    } else {
      setIsHidden(true);
    }

    totalDragDeltaRef.current = { x: 0, y: 0 };
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  if (isHidden) {
    return null;
  }

  return (
    <circle
      cx={currentPos.x}
      cy={currentPos.y}
      r={10}
      fill="#8884d8"
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
      onMouseDown={handleMouseDown}
    />
  );
};

export default Node;
