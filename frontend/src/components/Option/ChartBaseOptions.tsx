const chartBaseOptions = {
  scales: {
    x: {
      type: "linear",
      position: "bottom",
      min: 0,
      max: 40,
      dragData: true,
    },
    y: { type: "linear", min: 0, max: 40, dragData: true },
  },
  plugins: {
    legend: { display: true }, // 차트 상단에 범례 표시
    tooltip: {
      enabled: true,
      callbacks: {
        label: (context: any) => {
          const point: DataPoint = context.raw; // 툴팁이 현재 가리키고 있는 데이터 포인트의 원본 값
          return `${point.name}: (${point.x.toFixed(2)}, ${point.y.toFixed(
            2
          )})`;
        },
      },
    },
    dragData: {
      onDragEnd: (p1: any, p2: any, datasetIndex: number) => {
        /*좌표 정수로 바꾸고 싶으면 여기 수정하면 됨 근데 사용자에게 자유도를 제한할 거 같음..*/
        console.log("야미~");
      },
    },
  },
  maintainAspectRatio: false, // 차트가 캔버스 비율을 고정하지 않고, 부모 요소 크기에 맞춰 유연하게 늘어나도록 설정
  animation: false, // 차트 즉시 그리게 초기 렌더링 끔
};

export default chartBaseOptions;
