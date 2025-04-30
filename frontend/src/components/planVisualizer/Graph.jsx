// // src/components/Graph.js (수정 예시 경로)
// import React from "react";
// import {
//   ResponsiveContainer,
//   ScatterChart,
//   Scatter,
//   XAxis,
//   YAxis,
// } from "recharts";

// // BaseComponent로부터 data와 handleClick을 props로 전달받습니다.
// const Graph = ({ data, handleClick }) => {
//   // 기존의 useState와 handleClick 정의 부분은 삭제합니다.

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <ScatterChart>
//         <XAxis dataKey="x" />
//         <YAxis dataKey="y" />
//         <Scatter
//           data={data} // props로 받은 data 사용
//           fill="#8884d8"
//           onClick={handleClick} // props로 받은 handleClick 사용
//           onMouseOver={() => {
//             console.log("Mouse over");
//           }}
//         />
//       </ScatterChart>
//     </ResponsiveContainer>
//   );
// };

// export default Graph;
// src/components/Graph.js
// src/components/Graph.js (개선 제안)
import React from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip, // Tooltip 임포트 추가
  CartesianGrid, // CartesianGrid 임포트 추가
} from "recharts";
import PlanNode from "./PlanNode"; // 커스텀 점 컴포넌트 임포트

// BaseComponent (또는 DataVisualizer)로부터 data (그래프 데이터)와
// onPlanNodeDragEnd (점 드래그 종료 시 호출될 함수)를 props로 전달받습니다.
// handleClick은 필요하다면 일반 클릭 이벤트용으로 분리하거나 다른 이름으로 사용합니다.
const Graph = ({ data, onPlanNodeDragEnd }) => {
  // props 이름 변경 제안

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart>
        <CartesianGrid /> {/* 그리드 추가 */}
        <XAxis
          dataKey="x"
          type="number" // 데이터 타입 지정
          name="X Value"
          domain={["auto", "auto"]} // 도메인 자동 설정
        />
        <YAxis
          dataKey="y"
          type="number" // 데이터 타입 지정
          name="Y Value"
          domain={["auto", "auto"]} // 도메인 자동 설정
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} /> {/* 툴팁 추가 */}
        <Scatter
          name="Plans" // Scatter 이름 (툴팁 등에 표시될 수 있음)
          data={data} // 부모로부터 받은 data 사용
          fill="#8884d8"
          // 각 점을 렌더링하기 위해 PlanNode 컴포넌트 사용
          // PlanNode에 onDragEnd props로 부모로부터 받은 onPlanNodeDragEnd 함수 전달
          dot={<PlanNode onDragEnd={onPlanNodeDragEnd} />}
          // 만약 각 점 클릭 이벤트도 처리하고 싶다면 onPointClick 함수 등을 추가하고 PlanNode에도 전달
          // onPointClick={handlePlanNodeClick}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Graph;
