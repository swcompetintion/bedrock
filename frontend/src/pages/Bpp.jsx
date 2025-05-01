import React, { useState } from "react";
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
const domainXForGrid = [0, 29];
const domainYForGrid = [0, 29];

const stepX =
  gridCols > 1 ? (domainXForGrid[1] - domainXForGrid[0]) / (gridCols - 1) : 0;
const stepY =
  gridRows > 1 ? (domainYForGrid[1] - domainYForGrid[0]) / (gridRows - 1) : 0;

const scatterData2 = [];
for (let i = 0; i < gridRows; i++) {
  for (let j = 0; j < gridCols; j++) {
    const x = domainXForGrid[0] + j * stepX;
    const y = domainYForGrid[0] + i * stepY;
    scatterData2.push({ x: x, y: y });
  }
}

const allXValues = [
  ...scatterData.map((d) => d.x),
  ...scatterData2.map((d) => d.x),
];
const allYValues = [
  ...scatterData.map((d) => d.y),
  ...scatterData2.map((d) => d.y),
];

const minX = Math.min(...allXValues);
const maxX = Math.max(...allXValues);
const minY = Math.min(...allYValues);
const maxY = Math.max(...allYValues);

const domainX = [minX - 5 > 0 ? minX - 5 : 0, maxX + 5];
const domainY = [minY - 5 > 0 ? minY - 5 : 0, maxY + 5];

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
        {payload.map((entry, index) => (
          <p
            key={`tooltip-${index}`}
            style={{ margin: "0", lineHeight: "1.5" }}
          >
            <strong>{entry.name}:</strong> X={entry.payload.x.toFixed(2)}, Y=
            {entry.payload.y.toFixed(2)}
            {entry.name === "Real Data" &&
              typeof entry.payload.value !== "undefined" &&
              `, Value=${entry.payload.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

function ClickableScatterChart() {
  const [clickedChartCoords, setClickedChartCoords] = useState(null);

  const handleNodeClick = (data, index) => {
    console.log("Clicked Node Data:", data);
    console.log("Clicked Node Index:", index);
  };

  const handleChartBackgroundClick = (event) => {
    if (
      event &&
      typeof event.chartX === "number" &&
      typeof event.chartY === "number"
    ) {
      const clickX = event.chartX;
      const clickY = event.chartY;

      if (
        clickX >= ParigiAreaXMin &&
        clickX <= ParigiAreaXMax &&
        clickY >= ParigiAreaYMin &&
        clickY <= ParigiAreaYMax
      ) {
        const dataX =
          domainX[0] +
          ((clickX - ParigiAreaXMin) / ParigiAreaWidth) *
            (domainX[1] - domainX[0]);

        const dataY =
          domainY[1] -
          ((clickY - ParigiAreaYMin) / ParigiAreaHeight) *
            (domainY[1] - domainY[0]);

        setClickedChartCoords({ x: dataX.toFixed(2), y: dataY.toFixed(2) });

        console.log("클릭된 픽셀 좌표 (SVG 기준):", { x: clickX, y: clickY });
        console.log("계산된 데이터 좌표 (배경 클릭):", {
          x: dataX.toFixed(2),
          y: dataY.toFixed(2),
        });
      } else {
        setClickedChartCoords(null);
        console.log(
          "클릭이 그래프의 데이터 영역(plotting area) 밖에 있습니다."
        );
      }
    } else {
      setClickedChartCoords(null);
      console.log("클릭 이벤트에서 유효한 픽셀 좌표 정보를 얻을 수 없습니다.");
    }
  };

  const handleClearCoords = () => {
    setClickedChartCoords(null);
  };

  return (
    <div>
      <h2>클릭 가능한 산점도 그래프 (노드 및 배경 클릭, 커스텀 Tooltip)</h2>

      <ScatterChart
        width={chartWidth}
        height={chartHeight}
        margin={chartMargin}
        onClick={handleChartBackgroundClick}
      >
        <CartesianGrid />

        <XAxis type="number" dataKey="x" name="X 값" unit="" domain={domainX} />
        <YAxis type="number" dataKey="y" name="Y 값" unit="" domain={domainY} />

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
          onClick={handleNodeClick}
        />

        <Scatter
          name="Real Data"
          data={scatterData}
          fill="#8884d8"
          onClick={handleNodeClick}
          r={5}
        />
      </ScatterChart>

      <div style={{ marginTop: "20px" }}>
        <h3>그래프 배경 클릭 위치의 데이터 좌표:</h3>
        {clickedChartCoords ? (
          <p>
            데이터 좌표: X = {clickedChartCoords.x}, Y = {clickedChartCoords.y}
          </p>
        ) : (
          <p>그래프의 데이터 영역 빈 곳을 클릭해보세요!</p>
        )}
        <button onClick={handleClearCoords} style={{ marginTop: "10px" }}>
          화면 좌표 지우기
        </button>
      </div>
    </div>
  );
}

export default ClickableScatterChart;
