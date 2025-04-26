import React, { useState } from 'react';
import styled from "styled-components";

const Style=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
  cursor: pointer;
  `
const List = () => {
  


  const handleClick = (item) => {
    alert(`Clicked on: ${item.name}`);
  };

  return (
    <Style>
      <h2>Data List</h2>
      
    </Style>
  );
};

export default List;
