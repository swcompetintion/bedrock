import React, { useRef } from "react";
import { Bubble } from "react-chartjs-2"; // 자바스크립트 차트 라이브러리
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js"; // 자바스크립트 차트 라이브러리
import dragData from "chartjs-plugin-dragdata";
import { useDrop } from "react-dnd";
import { Item } from "../Data/Item";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, dragData);

interface GraphProps {
  chartData: any;
  options: any;
  onPointDragEnd?: (
    event: number,
    index: number,
    value: { x: number; y: number }
  ) => void;
  onTagDrop?: (item: any, position: { x: number; y: number }) => void;
}

const Graph: React.FC<GraphProps> = ({ chartData, options, onTagDrop }) => {
  const chartRef = useRef<any>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: Item.TAG,
    drop: (item: any, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (!chartRef.current || !clientOffset) {
        console.error("Chart reference or client offset is null.");
        return;
      }
      const chart = chartRef.current;
      const canvasRect = chart.canvas.getBoundingClientRect(); // DOM 요소의 위치와 크기를 브라우저 화면 기준으로 반환
      const canvasX = clientOffset.x - canvasRect.left; // 마우스가 캔버스 왼쪽에서 얼마나 오른쪽에 있는지
      const canvasY = clientOffset.y - canvasRect.top; // 마우스가 캔버스 꼭대기에서 얼마나 아래에 있는지
      const dataX = chart.scales["x"].getValueForPixel(canvasX); // 캔버스에서 마우스의 x축에서 값
      const dataY = chart.scales["y"].getValueForPixel(canvasY);

      if (onTagDrop) {
        onTagDrop(item, { x: dataX, y: dataY });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  drop(dropRef);

  const chartContainerStyle: React.CSSProperties = {
    position: "relative",
    height: "500px",
    border: isOver ? "2px dashed green" : "2px dashed transparent",
    backgroundColor: isOver ? "rgba(0, 255, 0, 0.05)" : "transparent",
    transition:
      "border-color 0.2s ease-in-out, background-color 0.2s ease-in-out",
  };

  return (
    <div ref={dropRef} style={chartContainerStyle}>
      <Bubble ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default Graph;
