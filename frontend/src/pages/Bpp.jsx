import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const scatterData = [
  { x: 10, y: 20, value: 200 },
  { x: 20, y: 30, value: 150 },
  { x: 30, y: 40, value: 250 },
  { x: 40, y: 20, value: 100 },
  { x: 50, y: 50, value: 300 },
  { x: 60, y: 35, value: 180 },
  { x: 70, y: 25, value: 220 },
];

const gridRows = 30;
const gridCols = 30;
const domainXForGrid = [0, 30];
const domainYForGrid = [0, 30];

const scatterData2 = [];
for (let y = 0; y < gridRows + 1; y++)
  for (let x = 0; x < gridCols + 1; x++) scatterData2.push({ x: x, y: y });

const chartWidth = 600;
const chartHeight = 400;
const chartMargin = { top: 20, right: 30, bottom: 20, left: 30 };

const CustomTooltip = ({ active, payload, label }) => {
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
          console.log(entry);
          return (
            <div key={`item-${index}`}>
              {entry.name}: {entry.value}
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};

function ClickableScatterChart() {
  return (
    <div>
      <h2>클릭 가능한 산점도 그래프 (노드 및 배경 클릭, 커스텀 Tooltip)</h2>

      <ScatterChart
        width={chartWidth}
        height={chartHeight}
        margin={chartMargin}
      >
        <CartesianGrid />

        <XAxis
          type="number"
          dataKey="x"
          name="X 값"
          unit=""
          domain={domainXForGrid}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Y 값"
          unit=""
          domain={domainYForGrid}
        />

        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={<CustomTooltip />}
        />

        <Legend />

        <Scatter
          name="Invisible Grid"
          data={scatterData2}
          fill="transparent"
          stroke="transparent"
          r={0}
          activeDot={{ r: 0 }}
          isAnimationActive={false}
        />

        <Scatter name="Real Data" data={scatterData} fill="#8884d8" r={5} />
      </ScatterChart>
    </div>
  );
}

export default ClickableScatterChart;
