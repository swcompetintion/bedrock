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

const List = ({ data, handleClick }) => {
  return (
    <Style>
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
