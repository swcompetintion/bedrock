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
    legend: { display: true },
    tooltip: {
      enabled: true,
      callbacks: {
        label: (context: any) => {
          const point: DataPoint = context.raw;
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
  maintainAspectRatio: false,
  animation: false,
};

export default chartBaseOptions;
