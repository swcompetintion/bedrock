// src/components/tags/DraggableTag.jsx
import React from "react";
import { useDrag } from "react-dnd";
import { Item } from "./Item"; // Item 임포트

const Tag = ({ id, name }) => {
  // useDrag 훅을 사용하여 이 엘리먼트를 드래그 소스로 만듭니다.
  const [{ isDragging }, drag] = useDrag(() => ({
    type: Item.TAG, // 드래그할 아이템의 타입은 'tag'
    item: { id, name }, // 드롭 대상에게 전달할 데이터 (태그의 id와 name)
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // 현재 드래그 중인지 상태를 수집
    }),
  }));

  const style = {
    padding: "8px",
    margin: "4px",
    border: "1px solid gray",
    backgroundColor: "#a8dadc", // 드래그 가능한 태그 배경색
    cursor: "move", // 마우스 커서를 이동 모양으로 변경
    opacity: isDragging ? 0.5 : 1, // 드래그 중에는 반투명하게 표시
    display: "inline-block", // 태그들을 가로로 나열
    borderRadius: "4px",
  };

  // ref={drag}를 적용하여 이 div 엘리먼트가 드래그 소스가 되도록 합니다.
  return (
    <div ref={drag} style={style}>
      {name} {/* 태그에 표시할 내용 */}
    </div>
  );
};

export default Tag;
