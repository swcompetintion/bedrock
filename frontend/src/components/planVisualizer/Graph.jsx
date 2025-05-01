import React from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  // 필요하다면 Tooltip 등을 추가할 수 있습니다.
  // Tooltip,
} from "recharts";
import Node from "./Node"; // Node 컴포넌트를 import 합니다.

const Graph = ({ data, handleClick, onNodeDragEnd }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      {" "}
      {/* 그래프 높이를 조금 늘려보세요 */}
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        {" "}
        {/* 그래프 여백 설정 */}
        {/* XAxis와 YAxis의 type을 "number"로 설정하여 수치형 축으로 만듭니다. */}
        <XAxis type="number" dataKey="x" name="X-coordinate" />{" "}
        {/* dataKey는 데이터에서 x 값을 사용할 것을 지정 */}
        <YAxis type="number" dataKey="y" name="Y-coordinate" />{" "}
        {/* dataKey는 데이터에서 y 값을 사용할 것을 지정 */}
        {/* Optional: 마우스 오버 시 데이터 정보를 보여주는 툴팁 추가 */}
        {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} /> */}
        <Scatter
          data={data}
          // shape prop에 함수를 전달합니다.
          // 이 함수는 Recharts가 각 데이터 포인트마다 호출하며 해당 포인트의 정보(props)를 전달해 줍니다.
          shape={(props) => (
            <Node
              {...props} // Recharts가 전달하는 기본 props (cx, cy, payload, xScale, yScale 등)를 Node 컴포넌트로 모두 전달합니다.
              handleClick={handleClick} // Graph 컴포넌트로부터 받은 handleClick prop을 Node로 전달
              onNodeDragEnd={onNodeDragEnd} // Graph 컴포넌트로부터 받은 onNodeDragEnd prop을 Node로 전달
            />
          )}
          fill="#8884d8" // 점의 색상 설정
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Graph;
