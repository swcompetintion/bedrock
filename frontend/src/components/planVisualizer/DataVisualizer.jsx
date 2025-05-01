import React, { useState } from "react";
import { initialData } from "../../tests/DummyData";

const DataVisualizer = ({ children }) => {
  // 노드 데이터 상태 관리
  const [data, setData] = useState(initialData);

  // 노드 위치를 업데이트하고 전체 데이터를 정렬하는 함수
  const updateNodePosition = ({ id, x, y }) => {
    console.log(`DataVisualizer: 노드 ${id} 위치 업데이트 요청 (${x}, ${y})`);

    setData((currentData) => {
      // 1. 해당 ID를 가진 노드의 위치(x, y)를 업데이트한 새로운 배열 생성
      const updatedData = currentData.map((item) =>
        item.id === id ? { ...item, x: x, y: y } : item
      );

      // 2. 업데이트된 배열을 x 값을 기준으로 정렬하고, x 값이 같으면 y 값을 기준으로 정렬
      updatedData.sort((a, b) => {
        if (a.x !== b.x) {
          return a.x - b.x; // x 값이 다르면 x 기준으로 오름차순 정렬
        } else {
          return a.y - b.y; // x 값이 같으면 y 기준으로 오름차순 정렬
        }
      });

      // 3. 정렬된 배열로 상태 업데이트
      return updatedData;
    });
  };

  // 노드 클릭 이벤트 핸들러 (기존과 동일)
  const handleClick = (item) => {
    alert(`Clicked on: ${item.name}`);
  };

  return (
    <>
      {/* 자식 컴포넌트에게 데이터와 핸들러 함수 전달 (기존과 동일) */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            data, // 업데이트 및 정렬된 데이터 전달
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
