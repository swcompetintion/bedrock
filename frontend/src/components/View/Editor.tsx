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
`; // dv 태그에 css 스타일을 지정하고 새로운 React 컴포넌트 생성

const Editor: React.FC = () => { //이 컴포넌트는 React의 함수형 컴포넌트이고, props를 받을 수 있다
  const [chartData, setChartData] = useState<ChartData>(TestData1); // chartData의 초기값은 TestData1이고 타입은 CharData
  useEffect(() => { // 컴포넌트가 화면에 나타난 후 아래 코드블록 수행
    console.log("chartData가 변경되었습니다!", chartData);
  }, [chartData]); // chartData가 변경될 때만 useEffect 실행
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

    setChartData((prevData) => { //useState의 상태 업데이트 함수
      const newData = structuredClone(prevData); // 원본 객체를 완전히 분리된 새로운 복사본으로 만들어 줌
      newData.datasets[0]?.data.push(newItem);
      return newData;
    }); // 이전 상태 복사하여 datasets[0]의 data 배열에 업데이트
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
          <Tag key={item.id} id={item.id} name={item.name} /> // 배열을 순회하며 각 항목마다 <Tag/ > 컴포넌트를 생성해서 렌더링링
        ))}
      </div>
    </Style>
  );
};

export default Editor;
