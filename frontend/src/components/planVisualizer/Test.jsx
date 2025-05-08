import React, { useState, useRef, useCallback } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale, // Scatter 차트는 보통 Linear Scale을 사용
  PointElement, // 데이터 포인트를 표시하기 위한 요소
  Tooltip, // 툴팁
  Legend, // 범례
} from "chart.js";
// dragData 플러그인 임포트
import dragData from "chartjs-plugin-dragdata";

// React Dnd 관련 임포트
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"; // 웹 환경을 위한 백엔드

// --- 1. 드래그 가능한 아이템 타입 정의 ---
const ItemTypes = {
  TAG: "tag", // 드래그하려는 아이템의 타입을 'tag'로 정의
};

// --- 2. 드래그 가능한 태그 컴포넌트 ---
const DraggableTag = ({ id, name }) => {
  // useDrag 훅을 사용하여 엘리먼트를 드래그 소스로 만듭니다.
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TAG, // 드래그할 아이템의 타입
    item: { id, name }, // 드롭 대상에게 전달할 데이터
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // 현재 드래그 중인지 상태
    }),
  }));

  const style = {
    padding: "8px",
    margin: "4px",
    border: "1px solid gray",
    backgroundColor: "#a8dadc", // 드래그 가능한 태그 배경색
    cursor: "move", // 마우스 커서를 이동 모양으로 변경
    opacity: isDragging ? 0.5 : 1, // 드래그 중에는 반투명하게 표시
    display: "inline-block", // 태그들을 가로로 나열
    borderRadius: "4px",
  };

  // ref={drag}를 적용하여 이 div 엘리먼트가 드래그 소스가 되도록 합니다.
  return (
    <div ref={drag} style={style}>
      {name} {/* 태그에 표시할 내용 */}
    </div>
  );
};

// --- 3. Scatter 차트 및 외부 태그 드롭을 처리하는 메인 컴포넌트 ---
// 이 컴포넌트는 DndProvider에 의해 감싸져 있어야 합니다.
const DraggableChartWithExternalTags = () => {
  // Chart.js에 필요한 컴포넌트 및 스케일, 플러그인 등을 등록합니다.
  // 일반적으로 애플리케이션의 진입점 파일(index.js 또는 App.js)에서 한 번만 등록하는 것이 좋습니다.
  ChartJS.register(
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    dragData // chartjs-plugin-dragdata 플러그인 등록
    // ChartDataLabels // 필요한 경우 데이터 레이블 플러그인 등록
  );

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

  // Chart.js 인스턴스에 접근하기 위한 ref
  const chartRef = useRef(null);

  // --- 4. chartjs-plugin-dragdata를 사용한 차트 내부 점 드래그 핸들러 ---
  const handlePointDragEnd = (e, datasetIndex, index, value) => {
    console.log("차트 내부 점 드래그 종료:", { datasetIndex, index, value });
    console.log(`변경된 좌표: x=${value.x}, y=${value.y}`);

    // Chart.js 데이터를 업데이트하여 변경된 위치를 반영합니다.
    // React 상태 업데이트는 불변성을 유지해야 합니다.
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

  // Chart.js 옵션 설정
  const chartOptions = {
    animation: false, // <-- 애니메이션 비활성화

    scales: {
      x: {
        type: "linear", // Scatter 차트는 'linear' 스케일 사용
        position: "bottom",
        min: 0, // X축 최소값
        max: 40, // X축 최대값
      },
      y: {
        type: "linear", // Scatter 차트는 'linear' 스케일 사용
        min: 0, // Y축 최소값
        max: 40, // Y축 최대값
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          // 툴팁에 점의 이름(name) 등을 표시하도록 커스터마이즈 가능
          label: function (context) {
            const label = context.dataset.label || "";
            const point = context.raw;
            // 데이터 객체에 name 속성이 있다면 표시
            if (point.name) {
              return `${point.name}: (${point.x.toFixed(2)}, ${point.y.toFixed(
                2
              )})`; // 좌표도 소수점 처리하여 표시
            }
            return `${label}: (${point.x.toFixed(2)}, ${point.y.toFixed(2)})`; // 좌표도 소수점 처리하여 표시
          },
        },
      },
      dragData: {
        // chartjs-plugin-dragdata 플러그인 설정
        dragData: true, // 차트 내부 점 드래그 기능 활성화
        dragX: true, // X축 드래그 허용
        dragY: true, // Y축 드래그 허용
        showTooltip: true, // 드래그 중 툴팁 표시
        onDragEnd: handlePointDragEnd, // 차트 내부 점 드래그 종료 핸들러 연결
      },
      // datalabels: { ... } // ChartDataLabels 설정
    },
    maintainAspectRatio: false, // 부모 요소의 크기에 맞춰 높이 조절 허용
  };

  // --- 5. 차트 영역을 드롭 대상으로 만들기 ---
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TAG, // 'tag' 타입의 아이템만 받음
    drop: (item, monitor) => {
      // 아이템이 드롭되었을 때 실행
      const clientOffset = monitor.getClientOffset(); // 화면 기준 드롭 좌표 { x, y }

      if (!chartRef.current || !clientOffset) {
        console.error("Chart reference or client offset is null.");
        return;
      }

      // Chart.js 인스턴스에 접근 (react-chartjs-2 v4 이상에서는 ref.current가 바로 인스턴스)
      const chart = chartRef.current;

      // --- 6. 화면 좌표를 차트 데이터 좌표로 변환 ---
      // 캔버스의 화면상 위치 및 크기
      const canvasRect = chart.canvas.getBoundingClientRect();

      // 드롭 위치를 캔버스 기준으로 계산
      const canvasX = clientOffset.x - canvasRect.left;
      const canvasY = clientOffset.y - canvasRect.top;

      // Chart.js 스케일 API를 사용하여 캔버스 픽셀 좌표를 데이터 값으로 변환
      // 'x'와 'y'는 scales 옵션에서 정의한 축 ID와 일치해야 합니다.
      // getValueForPixel 메서드는 캔버스 영역 내의 픽셀 좌표를 데이터 값으로 변환합니다.
      // 캔버스 영역 밖의 픽셀은 정확한 변환 값을 반환하지 않을 수 있습니다.
      const dataX = chart.scales["x"].getValueForPixel(canvasX);
      const dataY = chart.scales["y"].getValueForPixel(canvasY);

      console.log(`드롭된 화면 좌표: (${clientOffset.x}, ${clientOffset.y})`);
      console.log(`캔버스 기준 좌표: (${canvasX}, ${canvasY})`);
      console.log(
        `변환된 데이터 좌표: (${dataX.toFixed(2)}, ${dataY.toFixed(2)})`
      ); // 소수점 처리하여 표시

      // 새로운 데이터 포인트 객체 생성
      const newItem = {
        x: dataX, // 변환된 X 좌표
        y: dataY, // 변환된 Y 좌표
        id: item.id + "-" + Date.now(), // 고유 ID 생성 (충돌 방지)
        name: item.name, // 드롭된 태그의 이름 포함
      };

      // 새로운 데이터를 기존 데이터에 추가하여 상태 업데이트 (불변성 유지)
      setChartData((prevData) => {
        const newData = JSON.parse(JSON.stringify(prevData)); // 데이터를 깊은 복사
        // 첫 번째 데이터셋에 새로운 아이템 추가
        newData.datasets[0].data.push(newItem);
        return newData;
      });
    }, // end of drop function
    collect: (monitor) => ({
      isOver: monitor.isOver(), // 현재 드롭 대상 위에 드래그 중인지 여부
      canDrop: monitor.canDrop(), // 드래그 중인 아이템을 이 대상에 드롭할 수 있는지 여부
    }),
  })); // end of useDrop hook

  // 드롭 대상 영역(차트 컨테이너) 스타일
  const dropTargetStyle = {
    border: isOver ? "2px dashed green" : "2px dashed transparent", // 드래그 중 시각적 피드백
    backgroundColor: isOver ? "rgba(0, 255, 0, 0.05)" : "transparent", // 드래그 중 배경색 변경
    padding: "10px",
    width: "600px", // 컨테이너 너비 설정 (차트 너비와 맞추는 것이 좋음)
    height: "450px", // 컨테이너 높이 설정 (차트 높이 + 태그 영역 고려)
    margin: "20px auto", // 중앙 정렬 및 여백
    position: "relative", // 내부 요소 위치 조절을 위해 필요할 수 있음
    borderRadius: "8px",
    transition:
      "border-color 0.2s ease-in-out, background-color 0.2s ease-in-out", // 부드러운 전환 효과
  };

  return (
    // ref={drop}를 적용하여 이 div 엘리먼트를 드롭 대상으로 만듭니다.
    <div ref={drop} style={dropTargetStyle}>
      <h1>Scatter 차트 드래그앤드롭 예제</h1>

      {/* 드래그 가능한 태그 목록 영역 */}
      <div
        style={{
          marginBottom: "10px",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h3>✨ 드래그해서 차트에 추가해보세요!</h3>
        <DraggableTag id="type-A" name="점 유형 A" />
        <DraggableTag id="type-B" name="점 유형 B" />
        <DraggableTag id="type-C" name="점 유형 C" />
        {/* 필요에 따라 다른 태그들을 추가 */}
      </div>

      {/* Chart Area: height를 명시하여 ResponsiveContainer가 작동하도록 함 */}
      {/* Drop 대상 div의 높이에서 태그 목록 영역의 높이만큼 빼서 차트가 들어갈 공간 확보 */}
      <div style={{ position: "relative", height: "calc(100% - 80px)" }}>
        {" "}
        {/* 태그 영역 높이를 약 80px로 가정 */}
        <Scatter
          ref={chartRef} // Chart.js 인스턴스에 접근하기 위해 ref 연결
          data={chartData}
          options={chartOptions} // 애니메이션 비활성화 옵션 적용
        />
      </div>
    </div>
  );
};

// --- 4. DndProvider로 최상위 컴포넌트 감싸기 ---
// React Dnd를 사용하려면 DndProvider로 드래그/드롭 기능이 필요한 모든 컴포넌트들을 감싸야 합니다.
// 이 AppWithDnd 컴포넌트를 여러분의 실제 애플리케이션의 루트 컴포넌트(App.js 등)에서 렌더링하세요.
const AppWithDnd = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      {" "}
      {/* 웹 환경에서는 HTML5Backend 사용 */}
      <DraggableChartWithExternalTags />
    </DndProvider>
  );
};

export default AppWithDnd; // 이 컴포넌트를 내보내어 사용
