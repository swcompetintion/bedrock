import React, { useState } from "react";
import { initialData } from "../../tests/DummyData";
const DataVisualizer = ({ children }) => {
  const [data, setData] = useState(initialData); // 초기 데이터를 상태로 관리

  // 노드의 위치 업데이트 요청을 처리하는 함수
  const updateNodePosition = ({ id, x, y }) => {
    // 전달받은 id, x, y 값 확인
    console.log(
      `DataVisualizer: 노드 ${id} 위치 업데이트 요청 (${x}, ${y})` // localStorage.getItem("id") 대신 전달받은 id 사용 권장
    );
    // 전달받은 x, y가 숫자인지 확인 (문자열이면 변환)
    const numX = parseFloat(x);
    const numY = parseFloat(y);

    // 유효한 숫자인지 확인
    if (isNaN(numX) || isNaN(numY)) {
      console.error(`Invalid position data for node ${id}: x=${x}, y=${y}`);
      return; // 유효하지 않으면 업데이트 중단
    }

    // 상태 업데이트 함수 (이전 상태를 받아 새 상태 반환)
    setData((currentData) => {
      // map을 사용하여 특정 id를 가진 항목의 x, y 값만 업데이트한 새 배열 생성
      const updatedData = currentData.map(
        (item) =>
          item.id === Number(id) ? { ...item, x: numX, y: numY } : item // 숫자로 변환된 값 사용
      );

      // 정렬 전에 slice()로 복사본을 만들어서 정렬
      // x 값을 기준으로 먼저 오름차순 정렬, x가 같으면 y 값을 기준으로 오름차순 정렬
      const sortedData = updatedData.slice().sort((a, b) => {
        // 정렬 시에도 숫자로 비교하도록 명시적으로 변환
        const ax = parseFloat(a.x);
        const bx = parseFloat(b.x);
        const ay = parseFloat(a.y);
        const by = parseFloat(b.y);

        if (ax !== bx) {
          return ax - bx;
        } else {
          return ay - by;
        }
      });

      // 디버깅을 위해 업데이트하려는 정보와 최종 결과 배열 출력
      console.log(
        `Attempting to update id: ${id}, new x: ${numX}, new y: ${numY}`
      );
      console.log("Updated and Sorted Data (to be set):", updatedData);
      localStorage.removeItem("id");
      // 업데이트된 정렬된 데이터를 새로운 상태로 반환
      return sortedData;
    });
  };

  // 노드 클릭 이벤트 핸들러 (예시)
  const handleClick = (item) => {
    alert(`Clicked on: ${item.name} (ID: ${item.id})`);
    console.log("Clicked item data:", item);
  };

  // children으로 전달된 각 요소를 순회하며 props를 추가하여 클론
  return (
    <>
      {/* React.Children.map을 사용하여 children이 배열이 아니어도 안전하게 순회 */}
      {React.Children.map(children, (child) => {
        // 유효한 React 엘리먼트인 경우에만 처리
        if (React.isValidElement(child)) {
          // child 엘리먼트에 data, handleClick, onNodeDragEnd prop을 추가하여 클론
          // data prop은 현재 상태 데이터를 전달
          // handleClick prop은 노드 클릭 시 실행될 함수를 전달
          // onNodeDragEnd prop은 노드 드래그 종료 시 실행될 함수를 전달 (Node 컴포넌트에서 호출)
          return React.cloneElement(child, {
            data, // 현재 data 상태를 자식에게 전달
            handleClick, // 클릭 핸들러 전달
            onNodeDragEnd: updateNodePosition, // 드래그 종료 핸들러 전달
            // 다른 필요한 prop들이 있다면 여기에 추가
          });
        }
        // React 엘리먼트가 아닌 경우 (예: 문자열, 숫자 등) 그대로 반환
        return child;
      })}
    </>
  );
};

export default DataVisualizer;
// const DataVisualizer = ({ children }) => {
//   const [data, setData] = useState(initialData);

//   const updateNodePosition = ({ id, x, y }) => {
//     console.log(
//       `DataVisualizer: 노드 ${localStorage.getItem(
//         "id"
//       )} 위치 업데이트 요청 (${x}, ${y})`
//     );

//     setData((currentData) => {
//       // map을 사용하여 특정 id를 가진 항목의 x, y 값만 업데이트한 새 배열 생성
//       const updatedData = currentData.map(
//         (item) => (item.id === id ? { ...item, x: numX, y: numY } : item) // 숫자로 변환된 값 사용
//       );

//       // 정렬 전에 slice()로 복사본을 만들어서 정렬
//       // x 값을 기준으로 먼저 오름차순 정렬, x가 같으면 y 값을 기준으로 오름차순 정렬
//       const sortedData = updatedData.slice().sort((a, b) => {
//         // 정렬 시에도 숫자로 비교하도록 명시적으로 변환
//         const ax = parseFloat(a.x);
//         const bx = parseFloat(b.x);
//         const ay = parseFloat(a.y);
//         const by = parseFloat(b.y);

//         if (ax !== bx) {
//           return ax - bx;
//         } else {
//           return ay - by;
//         }
//       });

//       // 디버깅을 위해 업데이트하려는 정보와 최종 결과 배열 출력
//       console.log(
//         `Attempting to update id: ${id}, new x: ${numX}, new y: ${numY}`
//       );
//       console.log("Updated and Sorted Data (to be set):", sortedData);

//       return sortedData; // 정렬된 복사본 반환
//     });
//   };

//   const handleClick = (item) => {
//     alert(`Clicked on: ${item.name}`);
//   };

//   return (
//     <>
//       {React.Children.map(children, (child) => {
//         if (React.isValidElement(child)) {
//           return React.cloneElement(child, {
//             data,
//             handleClick,
//             onNodeDragEnd: updateNodePosition,
//           });
//         }
//         return child;
//       })}
//     </>
//   );
// };

// export default DataVisualizer;
