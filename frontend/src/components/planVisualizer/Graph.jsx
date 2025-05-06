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
  console.log(payload);
  if (localStorage.getItem("id") === null) {
    return;
  }
  useEffect(() => {
    const xEntry = payload.find((entry) => entry.dataKey === "x");
    const yEntry = payload.find((entry) => entry.dataKey === "y");

    const extractedX = xEntry?.value;
    const extractedY = yEntry?.value;

    if (extractedX !== undefined && extractedY !== undefined) {
      try {
        onNodeDragEnd({ x: extractedX, y: extractedY });
      } catch (e) {
        console.error(
          "CustomTooltip: 툴팁 좌표를 localStorage에 저장 중 오류 발생:",
          e
        );
      }
    }
  }, [active, payload]);
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          fontSize: "14px",
          color: "#333",
        }}
      >
        {payload.map((entry, index) => {
          if (!entry) return null;
          return (
            <div key={`item-${index}`}>
              {(entry.name || entry.dataKey) ?? "N/A"}: {entry.value ?? "N/A"}
            </div>
          );
        })}
      </div>
    );
  }

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
