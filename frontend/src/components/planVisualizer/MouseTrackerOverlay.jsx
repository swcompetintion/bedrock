import React from "react";

const MouseTrackerOverlay = ({ xScale, yScale, width, height, margin }) => {
  if (!xScale || !yScale || !width || !height || !margin) {
    return null;
  }

  const plotAreaWidth = width - margin.left - margin.right;
  const plotAreaHeight = height - margin.top - margin.bottom;

  if (plotAreaWidth <= 0 || plotAreaHeight <= 0) {
    return null;
  }

  const handleChartClick = (event) => {
    const clientX = event.clientX;
    const clientY = event.clientY;

    const svgElement = event.currentTarget.ownerSVGElement;
    if (!svgElement) {
      return null;
    }
    const svgRect = svgElement.getBoundingClientRect();

    const svgMouseX = clientX - svgRect.left;
    const svgMouseY = clientY - svgRect.top;

    const plotAreaMouseX = svgMouseX - margin.left;
    const plotAreaMouseY = svgMouseY - margin.top;

    const dataX = xScale.invert(plotAreaMouseX);
    const dataY = yScale.invert(plotAreaMouseY);

    const clampedDataX = Math.max(0, Math.min(30, dataX));
    const clampedDataY = Math.max(0, Math.min(30, dataY));

    console.log(
      `Chart clicked at: (${clampedDataX.toFixed(2)}, ${clampedDataY.toFixed(
        2
      )})`
    );
  };

  return (
    <rect
      x={margin.left}
      y={margin.top}
      width={plotAreaWidth}
      height={plotAreaHeight}
      fill="transparent"
      onClick={handleChartClick}
      style={{ pointerEvents: "all" }}
    />
  );
};

export default MouseTrackerOverlay;
