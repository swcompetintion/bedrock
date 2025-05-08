// src/components/chart/GraphContainer.jsx
import React, { useState } from "react";
import Graph from "./Graph"; // Graph 컴포넌트 임포트
import Tag from "./Tag"; // Tag 컴포넌트 임포트

const Editor = () => {
  // Scatter 차트의 데이터 상태 관리
  const [chartData, setChartData] = useState({
    datasets: [
      {
        label: "데이터 포인트",
        data: [
          { x: 10, y: 20, id: "initial-1", name: "기존 점 A" },
          { x: 15, y: 10, id: "initial-2", name: "기존 점 B" },
          { x: 25, y: 30, id: "initial-3", name: "기존 점 C" },
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)", // 점의 배경색
        borderColor: "rgba(75, 192, 192, 1)", // 점의 테두리 색
        pointRadius: 8, // 점 크기
        pointHoverRadius: 10, // 마우스 오버 시 점 크기
      },
    ],
  });

  // --- 차트 내부 점 드래그 종료 핸들러 ---
  // 이 함수는 Graph 컴포넌트에서 호출됩니다.
  const handlePointDragEnd = (e, datasetIndex, index, value) => {
    console.log("차트 내부 점 드래그 종료:", { datasetIndex, index, value });
    console.log(`변경된 좌표: x=${value.x}, y=${value.y}`);

    // Chart.js 데이터를 업데이트하여 변경된 위치를 반영합니다.
    setChartData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData)); // 데이터를 깊은 복사
      // 해당 데이터셋의 해당 인덱스 데이터 업데이트
      newData.datasets[datasetIndex].data[index] = {
        x: value.x,
        y: value.y,
        // 기존 데이터의 다른 속성도 유지 (id, name 등)
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

    // 새로운 데이터를 기존 데이터에 추가하여 상태 업데이트 (불변성 유지)
    setChartData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData)); // 데이터를 깊은 복사
      // 첫 번째 데이터셋에 새로운 아이템 추가 (필요에 따라 다른 데이터셋에 추가 로직 구현)
      if (newData.datasets.length > 0) {
        newData.datasets[0].data.push(newItem);
      } else {
        // 데이터셋이 없을 경우 새로운 데이터셋 생성 로직 추가
        newData.datasets.push({
          label: "새로운 데이터셋",
          data: [newItem],
          backgroundColor: "rgba(255, 159, 64, 0.6)",
          borderColor: "rgba(255, 159, 64, 1)",
          pointRadius: 8,
          pointHoverRadius: 10,
        });
      }
      return newData;
    });

    console.log("새로운 점 추가됨:", newItem);
    // TODO: 여기에서 새로운 점 정보 (newItem)를 서버로 전송하거나 다른 로직 수행
  };

  // Chart.js 기본 옵션 설정
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
      // dragData 플러그인 설정은 Graph 내부에서 onDragEnd 핸들러와 함께 결합됩니다.
      dragData: {
        /* 기본 설정 또는 빈 객체 */
      },
      // datalabels: { ... } // ChartDataLabels 설정
    },
    maintainAspectRatio: false, // 부모 요소 크기에 맞춤
    animation: false, // 애니메이션 비활성화 (요청 사항)
  };

  return (
    <div
      style={{
        width: "600px",
        margin: "20px auto",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h1>Scatter 차트 드래그앤드롭 예제</h1>

      {/* 드래그 가능한 태그 목록 영역 */}
      <div
        style={{
          marginBottom: "10px",
          padding: "10px",
          border: "1px dashed #ddd",
          borderRadius: "4px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h3>✨ 드래그해서 차트에 추가해보세요!</h3>
        <Tag id="type-A" name="점 유형 A" />
        <Tag id="type-B" name="점 유형 B" />
        <Tag id="type-C" name="점 유형 C" />
        {/* 필요에 따라 다른 태그들을 추가 */}
      </div>

      {/* Graph 컴포넌트 렌더링 */}
      {/* 높이를 명시하여 차트가 제대로 렌더링될 공간을 제공 */}
      <div style={{ position: "relative", height: "400px" }}>
        {" "}
        {/* 차트가 표시될 영역 높이 */}
        <Graph
          chartData={chartData} // 데이터 전달
          options={chartBaseOptions} // 옵션 전달
          onPointDragEnd={handlePointDragEnd} // 차트 내부 드래그 핸들러 전달
          onTagDrop={handleTagDrop} // 외부 태그 드롭 핸들러 전달
        />
      </div>
    </div>
  );
};

export default Editor;
