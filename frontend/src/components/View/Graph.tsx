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
      const canvasRect = chart.canvas.getBoundingClientRect();
      const canvasX = clientOffset.x - canvasRect.left;
      const canvasY = clientOffset.y - canvasRect.top;
      const dataX = chart.scales["x"].getValueForPixel(canvasX);
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
