import React, { useState, useEffect } from "react";
import Graph from "./Graph";
import Tag from "../Data/Tag";
import styled from "styled-components";
import { TestData1, TestData2 } from "../../tests/DummyData";
import chartBaseOptions from "../Option/ChartBaseOptions";
const Style = styled.div`
  #title {
    text-align: center;
  }
`;

const Editor: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>(TestData1);
  useEffect(() => {
    console.log("chartData가 변경되었습니다!", chartData);
  }, [chartData]);
  const handleTagDrop = (
    droppedItem: DataPoint,
    dataCoordinates: { x: number; y: number }
  ) => {
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

  return (
    <Style
      style={{
        width: "65%",
        margin: "20px auto",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h1 id="title">BedRock Planner</h1>
      <Graph
        chartData={chartData}
        options={chartBaseOptions}
        onTagDrop={handleTagDrop}
      />

      <div
        style={{
          marginBottom: "10px",
          padding: "10px",
          border: "1px dashed #ddd",
          borderRadius: "4px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h3>일정 추가</h3>
        {TestData2.map((item) => (
          <Tag key={item.id} id={item.id} name={item.name} />
        ))}
      </div>
    </Style>
  );
};

export default Editor;
