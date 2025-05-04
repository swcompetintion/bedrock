// import React, { useState, useEffect, useRef } from "react";

// const Node = (props) => {
//   const { cx, cy, payload, handleClick } = props;
//   const [currentPos, setCurrentPos] = useState({ x: cx, y: cy });
//   const [isDragging, setIsDragging] = useState(false);
//   const startClientPosRef = useRef({ x: 0, y: 0 });
//   const startNodePosRef = useRef({ x: cx, y: cy });
//   const totalDragDeltaRef = useRef({ x: 0, y: 0 });
//   useEffect(() => {
//     setCurrentPos({ x: cx, y: cy });
//     startNodePosRef.current = { x: cx, y: cy };
//     totalDragDeltaRef.current = { x: 0, y: 0 };
//   }, [cx, cy]);

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     startClientPosRef.current = { x: e.clientX, y: e.clientY };

//     startNodePosRef.current = { x: currentPos.x, y: currentPos.y };

//     totalDragDeltaRef.current = { x: 0, y: 0 };

//     e.preventDefault();
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     const deltaX = e.clientX - startClientPosRef.current.x;
//     const deltaY = e.clientY - startClientPosRef.current.y;

//     setCurrentPos((prevPos) => ({
//       x: prevPos.x + deltaX,
//       y: prevPos.y + deltaY,
//     }));

//     totalDragDeltaRef.current = {
//       x: totalDragDeltaRef.current.x + deltaX,
//       y: totalDragDeltaRef.current.y + deltaY,
//     };

//     startClientPosRef.current = { x: e.clientX, y: e.clientY };
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//     localStorage.setItem("id", payload.id);
//     const movedDistance = Math.sqrt(
//       Math.pow(totalDragDeltaRef.current.x, 2) +
//         Math.pow(totalDragDeltaRef.current.y, 2)
//     );

//     const clickThreshold = 5;

//     if (movedDistance < clickThreshold) {
//       if (handleClick) {
//         handleClick(payload);
//       }

//       setCurrentPos({ x: cx, y: cy });
//     }

//     totalDragDeltaRef.current = { x: 0, y: 0 };
//   };

//   useEffect(() => {
//     if (isDragging) {
//       window.addEventListener("mousemove", handleMouseMove);
//       window.addEventListener("mouseup", handleMouseUp);
//     }

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [isDragging]);

//   return (
//     <circle
//       cx={currentPos.x}
//       cy={currentPos.y}
//       r={5}
//       fill="#8884d8"
//       style={{ cursor: isDragging ? "grabbing" : "grab" }}
//       onMouseDown={handleMouseDown}
//       onMouseOver={() => console.log("Custom Node Mouse over", payload)}
//     />
//   );
// };

// export default Node;
import React, { useState, useEffect, useRef } from "react";

const Node = (props) => {
  const { cx, cy, payload, handleClick } = props;
  const [currentPos, setCurrentPos] = useState({ x: cx, y: cy });
  const [isDragging, setIsDragging] = useState(false);
  // 컴포넌트 숨김 상태를 관리할 state 추가
  const [isHidden, setIsHidden] = useState(false); // 초기값은 false (보여줌)

  const startClientPosRef = useRef({ x: 0, y: 0 });
  const startNodePosRef = useRef({ x: cx, y: cy });
  const totalDragDeltaRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setCurrentPos({ x: cx, y: cy });
    startNodePosRef.current = { x: cx, y: cy };
    totalDragDeltaRef.current = { x: 0, y: 0 };
    // cx, cy 변경 시 isHidden 상태도 초기화 (다시 보이게)
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
    console.log("mouse up");
    const movedDistance = Math.sqrt(
      Math.pow(totalDragDeltaRef.current.x, 2) +
        Math.pow(totalDragDeltaRef.current.y, 2)
    );

    const clickThreshold = 5;

    if (movedDistance < clickThreshold) {
      if (handleClick) {
        handleClick(payload);
      }
      // 클릭으로 간주되면 원래 위치로 되돌림 (숨기지 않음)
      setCurrentPos({ x: cx, y: cy });
      // 클릭인 경우 숨기지 않음
    } else {
      // 드래그가 일정 거리 이상 발생했으면 숨김
      setIsHidden(true); // handleMouseUp이 실행될 때 isHidden 상태를 true로 변경
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
  }, [isDragging]); // isDragging 상태가 변경될 때만 이펙트 재실행

  // isHidden 상태가 true이면 아무것도 렌더링하지 않음
  if (isHidden) {
    return null;
  }

  return (
    <circle
      cx={currentPos.x}
      cy={currentPos.y}
      r={5}
      fill="#8884d8"
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
      onMouseDown={handleMouseDown}
      onMouseOver={() => console.log("Custom Node Mouse over", payload)}
    />
  );
};

export default Node;
