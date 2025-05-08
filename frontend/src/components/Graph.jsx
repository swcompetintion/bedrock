// src/components/chart/Graph.jsx
import React, { useRef } from "react";
import { Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import dragData from "chartjs-plugin-dragdata";
import { useDrop } from "react-dnd";
import { Item } from "./Item"; // Item 임포트

// Chart.js에 필요한 컴포넌트 및 스케일, 플러그인 등을 등록합니다.
// 이 컴포넌트 내에서 등록하거나 애플리케이션의 진입점에서 한 번만 등록할 수 있습니다.
// 여기서는 컴포넌트 내에서 등록하겠습니다.
ChartJS.register(
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  dragData // chartjs-plugin-dragdata 플러그인 등록
  // ChartDataLabels // 필요한 경우 데이터 레이블 플러그인 등록
);

const Graph = ({ chartData, options, onPointDragEnd, onTagDrop }) => {
  const chartRef = useRef(null); // Chart.js 인스턴스 접근용 ref

  // useDrop 훅을 사용하여 차트 영역을 드롭 대상으로 만듭니다.
  const [{ isOver }, drop] = useDrop(() => ({
    accept: Item.TAG, // 'tag' 타입의 아이템만 받음
    drop: (item, monitor) => {
      // 아이템이 드롭되었을 때 실행
      const clientOffset = monitor.getClientOffset(); // 화면 기준 드롭 좌표 { x, y }

      if (!chartRef.current || !clientOffset) {
        console.error("Chart reference or client offset is null.");
        return;
      }

      // Chart.js 인스턴스에 접근 (react-chartjs-2 v4 이상에서는 ref.current가 바로 인스턴스)
      const chart = chartRef.current;

      // --- 화면 좌표를 차트 데이터 좌표로 변환 ---
      // 캔버스의 화면상 위치 및 크기
      const canvasRect = chart.canvas.getBoundingClientRect();

      // 드롭 위치를 캔버스 기준으로 계산
      const canvasX = clientOffset.x - canvasRect.left;
      const canvasY = clientOffset.y - canvasRect.top;

      // Chart.js 스케일 API를 사용하여 캔버스 픽셀 좌표를 데이터 값으로 변환
      const dataX = chart.scales["x"].getValueForPixel(canvasX);
      const dataY = chart.scales["y"].getValueForPixel(canvasY);

      console.log(`드롭된 화면 좌표: (${clientOffset.x}, ${clientOffset.y})`);
      console.log(`캔버스 기준 좌표: (${canvasX}, ${canvasY})`);
      console.log(
        `변환된 데이터 좌표: (${dataX.toFixed(2)}, ${dataY.toFixed(2)})`
      );

      // 부모 컴포넌트로부터 전달받은 onTagDrop 콜백 함수 호출
      // 드롭된 아이템 정보와 변환된 데이터 좌표를 함께 전달합니다.
      if (onTagDrop) {
        onTagDrop(item, { x: dataX, y: dataY });
      }
    }, // end of drop function
    collect: (monitor) => ({
      isOver: monitor.isOver(), // 현재 드롭 대상 위에 드래그 중인지 여부
      canDrop: monitor.canDrop(), // 드래그 중인 아이템을 이 대상에 드롭할 수 있는지 여부
    }),
  })); // end of useDrop hook

  // 차트 컨테이너 스타일 (드래그 중 시각적 피드백 포함)
  const chartContainerStyle = {
    position: "relative", // 내부 요소 위치 조절을 위해 필요
    height: "500px", // 부모 div의 높이를 채우도록 설정

    border: isOver ? "2px dashed green" : "2px dashed transparent", // 드래그 중 시각적 피드백
    backgroundColor: isOver ? "rgba(0, 255, 0, 0.05)" : "transparent", // 드래그 중 배경색 변경
    transition:
      "border-color 0.2s ease-in-out, background-color 0.2s ease-in-out", // 부드러운 전환
  };

  // Chart.js 옵션에 onPointDragEnd 핸들러 연결
  const chartOptionsWithDrag = {
    ...options, // 부모로부터 받은 기본 옵션
    plugins: {
      ...options.plugins,
      dragData: {
        // chartjs-plugin-dragdata 플러그인 설정
        ...options.plugins?.dragData, // 기존 dragData 옵션이 있다면 유지
        dragData: true, // 차트 내부 점 드래그 기능 활성화
        dragX: true, // X축 드래그 허용
        dragY: true, // Y축 드래그 허용
        showTooltip: true, // 드래그 중 툴팁 표시
        onDragEnd: onPointDragEnd, // 부모로부터 받은 점 드래그 종료 핸들러 연결
      },
    },
    animation: false, // 애니메이션 비활성화 (요청 사항 반영)
  };

  return (
    // ref={drop}를 적용하여 이 div 엘리먼트를 드롭 대상으로 만듭니다.
    <div ref={drop} style={chartContainerStyle}>
      <Bubble
        ref={chartRef} // Chart.js 인스턴스에 접근하기 위해 ref 연결
        data={chartData}
        options={chartOptionsWithDrag} // 드래그 핸들러가 연결된 옵션 사용
      />
    </div>
  );
};

export default Graph;
