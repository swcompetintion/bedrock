// src/components/Graph.js (수정 예시 경로)
import React from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
} from "recharts";

// BaseComponent로부터 data와 handleClick을 props로 전달받습니다.
const Graph = ({ data, handleClick }) => {
  // 기존의 useState와 handleClick 정의 부분은 삭제합니다.

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart>
        <XAxis dataKey="x" />
        <YAxis dataKey="y" />
        <Scatter
          data={data} // props로 받은 data 사용
          fill="#8884d8"
          onClick={handleClick} // props로 받은 handleClick 사용
          onMouseOver={() => {
            console.log("Mouse over");
          }}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Graph;
