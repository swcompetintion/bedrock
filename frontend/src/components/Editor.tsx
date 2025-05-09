import React, { useState } from "react";
import Graph from "./Graph";
import Tag from "./Tag";
import styled from "styled-components";


const Style = styled.div`
  #title {
    text-align: center;
  }
`;

interface DataPoint {
  x: number;
  y: number;
  id: string;
  name: string;
  r?: number;
}

interface Dataset {
  label: string;
  data: DataPoint[];
  backgroundColor: string;
  borderColor: string;
  pointRadius: number;
  pointHoverRadius: number;
}

interface ChartData {
  datasets: Dataset[];
}

const Editor: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    datasets: [
      {
        label: "데이터 포인트",
        data: [
          { x: 10, y: 20, id: "initial-1", name: "기존 점 A", r: 6 },
          { x: 15, y: 10, id: "initial-2", name: "기존 점 B", r: 15 },
          { x: 25, y: 30, id: "initial-3", name: "기존 점 C", r: 10 },
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointRadius: 18,
        pointHoverRadius: 10,
      },
    ],
  });

  const handlePointDragEnd = (
    datasetIndex: number,
    index: number,
    value: { x: number; y: number }
  ) => {
    console.log("차트 내부 점 드래그 종료:", { datasetIndex, index, value });

    setChartData((prevData) => {
      const newData = structuredClone(prevData);
      newData.datasets[datasetIndex].data[index] = { ...newData.datasets[datasetIndex].data[index], x: value.x, y: value.y };
      return newData;
    });
  };

  const handleTagDrop = (droppedItem: DataPoint, dataCoordinates: { x: number; y: number }) => {
    console.log("태그가 차트에 드롭됨!", droppedItem);

    const newItem: DataPoint = {
      x: dataCoordinates.x,
      y: dataCoordinates.y,
      id: `${droppedItem.id}-${Date.now()}`,
      name: droppedItem.name,
    };

    setChartData((prevData) => {
      const newData = structuredClone(prevData);
      newData.datasets[0]?.data.push(newItem);
      return newData;
    });
  };

  const chartBaseOptions = {
    scales: {
      x: { type: "linear", position: "bottom", min: 0, max: 40 ,dragData: true},
      y: { type: "linear", min: 0, max: 40 ,dragData: true},
    },
    plugins: {
      legend: { display: true },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) => {
            const point: DataPoint = context.raw;
            return `${point.name}: (${point.x.toFixed(2)}, ${point.y.toFixed(2)})`;
          },
        },
      },
      dragData: {},
      
    },
    maintainAspectRatio: false,
    animation: false,
  };

  return (
    <Style style={{ width: "65%", margin: "20px auto", padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h1 id="title">BedRock Planner</h1>
      <Graph chartData={chartData} options={chartBaseOptions} onPointDragEnd={handlePointDragEnd} onTagDrop={handleTagDrop} />

      <div style={{ marginBottom: "10px", padding: "10px", border: "1px dashed #ddd", borderRadius: "4px", backgroundColor: "#f8f9fa" }}>
        <h3>일정 추가</h3>
        <Tag id={1} name="점 유형 A" />
        <Tag id={2} name="점 유형 B" />
        <Tag id={3} name="점 유형 C" />
      </div>
    </Style>
  );
};

export default Editor;
