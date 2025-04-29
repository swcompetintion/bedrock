// src/components/List.js (수정 예시 경로)
import React from "react";
import styled from "styled-components";

const Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
  background-color: #f0f0f0;

  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  transition: transform 0.2s;

  li:hover {
    transform: scale(1.05);
  }
  cursor: pointer;
`;

// BaseComponent로부터 data와 handleClick을 props로 전달받습니다.
const List = ({ data, handleClick }) => {
  // 기존의 handleClick 정의 부분은 삭제합니다.
  // data는 props로 전달받았으므로 필요에 따라 사용 가능합니다.

  return (
    <Style>
      {/* 예시: data를 사용하여 목록을 렌더링할 경우 */}
      <ul>
        {data &&
          data.map((item, index) => (
            <li key={index} onClick={() => handleClick(item)}>
              {item.name} (x: {item.x}, y: {item.y})
            </li>
          ))}
      </ul>
    </Style>
  );
};

export default List;
