// src/components/PlanNode.jsx
import React, { useState, useRef, useEffect } from "react";

const PlanNode = (props) => {
  const {
    cx,
    cy,
    r,
    payload,
    index,
    onDragEnd,
    chartX,
    chartY,
    width,
    height,
    xAxis,
    yAxis,
  } = props;

  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    startCx: 0,
    startCy: 0,
  });
  const [dragOffset, setDragOffset] = useState({ dx: 0, dy: 0 });

  // 마우스 다운 이벤트 핸들러 (드래그 시작)
  const handleMouseDown = (event) => {
    console.log("PlanNode: handleMouseDown called", { cx, cy, index }); // <-- 이 로그가 찍히는지 확인

    dragRef.current.isDragging = true;
    dragRef.current.startX = event.clientX;
    dragRef.current.startY = event.clientY;
    dragRef.current.startCx = cx;
    dragRef.current.startCy = cy;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    event.preventDefault(); // 기본 동작 방지
    event.stopPropagation(); // 이벤트 버블링 중단 (다른 요소의 이벤트에 영향 주지 않도록)
  };

  // 마우스 무브 이벤트 핸들러 (드래그 중 이동)
  const handleMouseMove = (event) => {
    if (!dragRef.current.isDragging) return;

    console.log("PlanNode: handleMouseMove called"); // <-- 이 로그가 계속 찍히는지 확인

    const dx = event.clientX - dragRef.current.startX;
    const dy = event.clientY - dragRef.current.startY;

    setDragOffset({ dx, dy });
  };

  // 마우스 업 이벤트 핸들러 (드래그 종료)
  const handleMouseUp = (event) => {
    if (!dragRef.current.isDragging) return;

    console.log("PlanNode: handleMouseUp called"); // <-- 이 로그가 찍히는지 확인

    dragRef.current.isDragging = false;

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);

    const finalCx = dragRef.current.startCx + dragOffset.dx;
    const finalCy = dragRef.current.startCy + dragOffset.dy;

    // 픽셀 -> 데이터 좌표 변환 로직 (이전 예시와 동일)
    const [xDomainMin, xDomainMax] = xAxis.domain;
    const [yDomainMin, yDomainMax] = yAxis.domain;
    const plotAreaLeft = chartX;
    const plotAreaRight = chartX + width;
    const plotAreaTop = chartY;
    const plotAreaBottom = chartY + height;

    let newDataX, newDataY;
    if (plotAreaRight - plotAreaLeft > 0) {
      newDataX =
        xDomainMin +
        ((finalCx - plotAreaLeft) * (xDomainMax - xDomainMin)) /
          (plotAreaRight - plotAreaLeft);
    } else {
      newDataX = payload.x;
    }
    if (plotAreaBottom - plotAreaTop > 0) {
      newDataY =
        yDomainMax -
        ((finalCy - plotAreaTop) * (yDomainMax - yDomainMin)) /
          (plotAreaBottom - plotAreaTop);
    } else {
      newDataY = payload.y;
    }

    setDragOffset({ dx: 0, dy: 0 }); // 오프셋 초기화

    if (onDragEnd) {
      console.log("PlanNode: Calling onDragEnd", { index, newDataX, newDataY }); // <-- 이 로그가 찍히는지 확인
      onDragEnd(index, { ...payload, x: newDataX, y: newDataY });
    }
  };

  // 컴포넌트 언마운트 시 이벤트 리스너 정리
  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // 드래그 중에는 transform 스타일로 시각적 위치 이동
  return (
    <g
      transform={`translate(${dragOffset.dx}, ${dragOffset.dy})`}
      onMouseDown={handleMouseDown} // 마우스 다운 이벤트 리스너
      style={{ cursor: dragRef.current.isDragging ? "grabbing" : "grab" }}
    >
      {/* 실제 점 (원) */}
      <circle
        cx={cx}
        cy={cy}
        r={r || 5} // r prop이 없으면 기본값 5 사용
        fill={props.fill || "#8884d8"} // fill prop이 없으면 기본 색상 사용
        stroke="#fff"
        strokeWidth={1}
        // 원 자체에 이벤트 리스너를 달기보다 부모 g에 다는 것이 클릭/드래그 영역 확보에 유리합니다.
      />
      {/* 필요하다면 텍스트 등 추가 */}
    </g>
  );
};

export default PlanNode;
