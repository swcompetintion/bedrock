import React, { useEffect } from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Node from "./Node";

const CustomTooltip = ({ active, payload, label, onNodeDragEnd }) => {
  const jsonString = JSON.stringify(payload);
  const regex = /"payload":\{"x":(\d+),"y":(\d+)\}/;
  const match = jsonString.match(regex);

  let extractedX = undefined;
  let extractedY = undefined;

  if (match && match[1] !== undefined && match[2] !== undefined) {
    // 정규 표현식 그룹 1번과 2번에서 각각 x와 y 값을 문자열로 가져옵니다.
    extractedX = Number(match[1]); // 숫자로 변환
    extractedY = Number(match[2]); // 숫자로 변환

    console.log("문자열에서 추출된 x 값 (정규식):", extractedX); // 30
    console.log("문자열에서 추출된 y 값 (정규식):", extractedY); // 19
  } else {
    console.log("문자열에서 x, y 값을 추출할 수 없습니다.");
  }
  console.log(localStorage.getItem("id") + " " + extractedX + " " + extractedY);
  onNodeDragEnd({
    id: localStorage.getItem("id"),
    x: extractedX,
    y: extractedY,
  });
  return null;
};

const Graph = ({ data, handleClick, onNodeDragEnd }) => {
  const filteredData = data.filter((item) => {
    return item.x >= 0 && item.x <= 30 && item.y >= 0 && item.y <= 30;
  });

  const ticks = Array.from({ length: 31 }, (_, i) => i);

  const fakeData = [];
  for (let y = 0; y < 31; y++) {
    for (let x = 0; x < 31; x++) {
      fakeData.push({ x, y });
    }
  }

  return (
    <ResponsiveContainer width="100%" height={600}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis
          type="number"
          dataKey="x"
          name="X-coordinate"
          domain={[0, 30]}
          ticks={ticks}
          interval={0}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Y-coordinate"
          domain={[0, 30]}
          ticks={ticks}
        />
        // Graph.jsx (수정된 부분)
        <Tooltip content={<CustomTooltip onNodeDragEnd={onNodeDragEnd} />} />
        <Scatter
          name="Visible Grid Points"
          data={fakeData}
          fill="rgba(139, 0, 255, 0.3)"
          stroke="transparent"
          isAnimationActive={false}
        />
        <Scatter
          name="Actual Data"
          data={filteredData}
          shape={(props) => <Node {...props} handleClick={handleClick} />}
          fill="#8884d8"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Graph;
