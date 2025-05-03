import React, { useState, useEffect, useRef } from "react";

const Node = (props) => {
  const { cx, cy, payload, handleClick, onNodeDragEnd } = props;
  const [currentPos, setCurrentPos] = useState({ x: cx, y: cy });
  const [isDragging, setIsDragging] = useState(false);
  const startClientPosRef = useRef({ x: 0, y: 0 });
  const startNodePosRef = useRef({ x: cx, y: cy });
  const totalDragDeltaRef = useRef({ x: 0, y: 0 });
  useEffect(() => {
    setCurrentPos({ x: cx, y: cy });
    startNodePosRef.current = { x: cx, y: cy };
    totalDragDeltaRef.current = { x: 0, y: 0 };
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
      if (onNodeDragEnd) {
        onNodeDragEnd({
          id: payload.id,
          x: localStorage.getItem("X"),
          y: localStorage.getItem("Y"),
        });
      }
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

  return (
    <circle
      cx={currentPos.x}
      cy={currentPos.y}
      r={5}
      fill="#8884d8"
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
      onMouseDown={handleMouseDown}
    />
  );
};

export default Node;
// import React, { useState, useEffect, useRef } from "react";

// const Node = (props) => {
//   const { cx, cy, payload, handleClick, onNodeDragEnd } = props;
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
//     localStorage.setItem("id", payload.id);
//     e.preventDefault();
//     e.stopPropagation(); // 이벤트 버블링 중단 (다른 곳에 영향 최소화)
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     const deltaX = e.clientX - startClientPosRef.current.x;
//     const deltaY = e.clientY - startClientPosRef.current.y;

//     const newX =
//       startNodePosRef.current.x + totalDragDeltaRef.current.x + deltaX;
//     const newY =
//       startNodePosRef.current.y + totalDragDeltaRef.current.y + deltaY;

//     setCurrentPos({ x: newX, y: newY });

//     totalDragDeltaRef.current = {
//       x: totalDragDeltaRef.current.x + deltaX,
//       y: totalDragDeltaRef.current.y + deltaY,
//     };

//     startClientPosRef.current = { x: e.clientX, y: e.clientY };
//     console.log(localStorage.getItem("X"));
//     onNodeDragEnd({
//       id: payload.id,
//       x: currentPos.x,
//       y: currentPos.y,
//     });

//     // 이 시점에 다른 곳에 현재 위치를 표시하는 로직을 추가할 수 있습니다.
//     // 예: 부모 컴포넌트에 currentPos 값을 prop으로 올려보내 상태를 업데이트하고,
//     // 부모 컴포넌트가 이 값을 화면 어딘가에 표시하도록 합니다.
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);

//     const movedDistance = Math.sqrt(
//       Math.pow(currentPos.x - startNodePosRef.current.x, 2) +
//         Math.pow(currentPos.y - startNodePosRef.current.y, 2)
//     );

//     const clickThreshold = 5;

//     if (movedDistance < clickThreshold) {
//       if (handleClick) {
//         handleClick(payload);
//       }
//       setCurrentPos({ x: cx, y: cy });
//     } else {
//       if (onNodeDragEnd) {
//         // 드래그 종료 시점의 노드 최종 위치(currentPos) 사용
//         onNodeDragEnd({
//           id: payload.id,
//           x: currentPos.x,
//           y: currentPos.y,
//         });
//       }
//     }

//     startClientPosRef.current = { x: 0, y: 0 };
//     startNodePosRef.current = { x: currentPos.x, y: currentPos.y };
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
//   }, [isDragging, handleMouseMove, handleMouseUp]);

//   return (
//     // <g> 태그를 사용하여 여러 SVG 요소를 그룹화하고 위치를 조정합니다.
//     <g transform={`translate(${currentPos.x}, ${currentPos.y})`}>
//       <circle
//         cx={0} // g 태그 안에서는 cx, cy를 0으로 설정하고 g 태그의 transform으로 위치 조정
//         cy={0}
//         r={5}
//         fill="#8884d8"
//         style={{ cursor: isDragging ? "grabbing" : "grab" }}
//         onMouseDown={handleMouseDown}
//       />
//       {/* 드래그 중일 때만 현재 좌표 표시 */}
//       {isDragging && (
//         <text
//           x={10} // 노드(circle) 중심에서 오른쪽으로 10px 떨어진 위치
//           y={-10} // 노드(circle) 중심에서 위쪽으로 10px 떨어진 위치
//           fontSize={12}
//           fill="#333"
//           textAnchor="start" // 텍스트 시작점을 x, y 좌표에 맞춤
//         >
//           {`(${currentPos.x.toFixed(1)}, ${currentPos.y.toFixed(1)})`}{" "}
//           {/* 소수점 첫째 자리까지 표시 */}
//         </text>
//       )}
//     </g>
//   );
// };

// export default Node;
