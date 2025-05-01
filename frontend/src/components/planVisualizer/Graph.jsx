import React from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid, // CartesianGrid 컴포넌트가 필요하다면 계속 유지합니다.
} from "recharts";
import Node from "./Node";

const Graph = ({ data, handleClick, onNodeDragEnd }) => {
  // 데이터를 필터링하여 x, y 값이 0에서 30 사이인 데이터만 남깁니다.
  const filteredData = data.filter((item) => {
    return item.x >= 0 && item.x <= 30 && item.y >= 0 && item.y <= 30;
  });

  // 0부터 30까지 1 단위로 눈금을 표시하기 위한 배열을 생성합니다.
  const ticks = Array.from({ length: 31 }, (_, i) => i); // [0, 1, 2, ..., 30]

  return (
    <ResponsiveContainer width="100%" height={600}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        {/* 방충망 격자가 필요하다면 이 부분을 유지합니다. */}
        {/* <CartesianGrid strokeDasharray="3 3" verticalPoints={ticks} horizontalPoints={ticks} /> */}

        {/* XAxis에 ticks prop과 함께 interval={0} 속성 추가 */}
        <XAxis
          type="number"
          dataKey="x"
          name="X-coordinate"
          domain={[0, 30]}
          ticks={ticks}
          interval={0} // 모든 눈금을 표시하도록 설정
        />
        {/* YAxis에 ticks prop과 함께 interval={0} 속성 추가 */}
        <YAxis
          type="number"
          dataKey="y"
          name="Y-coordinate"
          domain={[0, 30]}
          ticks={ticks}
        />
        <Scatter
          // 필터링된 데이터를 Scatter 컴포넌트에 전달합니다.
          data={filteredData}
          shape={(props) => (
            <Node
              {...props}
              handleClick={handleClick}
              onNodeDragEnd={onNodeDragEnd}
            />
          )}
          fill="#8884d8"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Graph;
