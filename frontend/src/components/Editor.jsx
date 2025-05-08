// src/components/chart/GraphContainer.jsx
import React, { useState } from "react";
import Graph from "./Graph"; // Graph 컴포넌트 임포트
import Tag from "./Tag"; // Tag 컴포넌트 임포트
import styled from "styled-components";
const Style = styled.div`
  #title {
    text-align: center;
  }
`;
const Editor = () => {
  const [chartData, setChartData] = useState({
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

  const handlePointDragEnd = (e, datasetIndex, index, value) => {
    console.log("차트 내부 점 드래그 종료:", { datasetIndex, index, value });
    console.log(`변경된 좌표: x=${value.x}, y=${value.y}`);

    setChartData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData)); // 데이터를 깊은 복사

      newData.datasets[datasetIndex].data[index] = {
        x: value.x,
        y: value.y,

        ...prevData.datasets[datasetIndex].data[index],
      };
      return newData;
    });

    // TODO: 여기에서 변경된 좌표를 서버로 전송하거나 다른 로직 수행
  };

  // --- 외부 태그 드롭 핸들러 ---
  // 이 함수는 Graph 컴포넌트에서 호출됩니다.
  const handleTagDrop = (droppedItem, dataCoordinates) => {
    console.log("태그가 차트에 드롭됨!", droppedItem);
    console.log("변환된 데이터 좌표:", dataCoordinates);

    // 새로운 데이터 포인트 객체 생성
    const newItem = {
      x: dataCoordinates.x, // 변환된 X 좌표
      y: dataCoordinates.y, // 변환된 Y 좌표
      id: droppedItem.id + "-" + Date.now(), // 고유 ID 생성 (충돌 방지)
      name: droppedItem.name, // 드롭된 태그의 이름 포함
    };

    setChartData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));

      if (newData.datasets.length > 0) {
        newData.datasets[0].data.push(newItem);
      }
      return newData;
    });

    console.log("새로운 점 추가됨:", newItem);
    // TODO: 여기에서 새로운 점 정보 (newItem)를 서버로 전송하거나 다른 로직 수행
  };

  const chartBaseOptions = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        min: 0,
        max: 40,
      },
      y: {
        type: "linear",
        min: 0,
        max: 40,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const point = context.raw;
            if (point.name) {
              return `${point.name}: (${point.x.toFixed(2)}, ${point.y.toFixed(
                2
              )})`;
            }
            return `${label}: (${point.x.toFixed(2)}, ${point.y.toFixed(2)})`;
          },
        },
      },

      dragData: {},
    },
    maintainAspectRatio: false, // 부모 요소 크기에 맞춤
    animation: false,
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
        chartData={chartData} // 데이터 전달
        options={chartBaseOptions} // 옵션 전달
        onPointDragEnd={handlePointDragEnd} // 차트 내부 드래그 핸들러 전달
        onTagDrop={handleTagDrop} // 외부 태그 드롭 핸들러 전달
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
        <Tag id="type-A" name="점 유형 A" />
        <Tag id="type-B" name="점 유형 B" />
        <Tag id="type-C" name="점 유형 C" />
      </div>

      <div style={{ position: "relative", height: "400px" }}></div>
    </Style>
  );
};

export default Editor;
