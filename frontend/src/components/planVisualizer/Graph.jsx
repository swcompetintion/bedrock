// import React, { useEffect } from "react";
// import {
//   ResponsiveContainer,
//   ScatterChart,
//   Scatter,
//   XAxis,
//   YAxis,
//   Tooltip,
// } from "recharts";
// import Node from "./Node";

// const CustomTooltip = ({ active, payload, label }) => {
//   useEffect(() => {
//     let x = null;
//     let y = null;

//     if (payload && Array.isArray(payload) && payload.length > 0) {
//       x = payload[0].payload.x;
//       y = payload[0].payload.y;
//     }

//     console.log(x, y);

//     if (active && payload && payload.length) {
//       try {
//         localStorage.setItem("x", x);
//         localStorage.setItem("y", y);
//       } catch (e) {
//         console.error("Error saving to localStorage", e);
//       }
//     }
//   }, [active, payload]);

//   if (active && payload && payload.length) {
//     return (
//       <div
//         style={{
//           backgroundColor: "rgba(255, 255, 255, 0.9)",
//           border: "1px solid #ccc",
//           padding: "10px",
//           borderRadius: "5px",
//           fontSize: "14px",
//           color: "#333",
//         }}
//       >
//         {payload.map((entry, index) => {
//           return (
//             <div key={`item-${index}`}>
//               {entry.name}: {entry.value}
//             </div>
//           );
//         })}
//       </div>
//     );
//   }

//   return null;
// };

// const Graph = ({ data, handleClick, onNodeDragEnd }) => {
//   const filteredData = data.filter((item) => {
//     return item.x >= 0 && item.x <= 30 && item.y >= 0 && item.y <= 30;
//   });

//   const ticks = Array.from({ length: 31 }, (_, i) => i);
//   const fakeData = [];
//   for (let y = 0; y < 31; y++)
//     for (let x = 0; x < 31; x++) fakeData.push({ x, y });

//   return (
//     <ResponsiveContainer width="100%" height={600}>
//       <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
//         <XAxis
//           type="number"
//           dataKey="x"
//           name="X-coordinate"
//           domain={[0, 30]}
//           ticks={ticks}
//           interval={0}
//         />

//         <YAxis
//           type="number"
//           dataKey="y"
//           name="Y-coordinate"
//           domain={[0, 30]}
//           ticks={ticks}
//         />
//         <Tooltip content={<CustomTooltip />} />

//         <Scatter
//           name="Invisible Grid"
//           data={fakeData}
//           fill="transparent"
//           stroke="transparent"
//           r={3}
//           activeDot={{ r: 3 }}
//           isAnimationActive={false}
//         />
//         <Scatter
//           data={filteredData}
//           shape={(props) => (
//             <Node
//               {...props}
//               handleClick={handleClick}
//               onNodeDragEnd={onNodeDragEnd}
//             />
//           )}
//           fill="#8884d8"
//         />
//       </ScatterChart>
//     </ResponsiveContainer>
//   );
// };

// export default Graph;
import React, { useEffect } from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Node from "./Node";

const CustomTooltip = ({ active, payload, label }) => {
  useEffect(() => {
    if (!active) {
      localStorage.removeItem("tooltipX");
      localStorage.removeItem("tooltipY");
      return;
    }

    if (!payload || !Array.isArray(payload) || payload.length === 0) {
      localStorage.removeItem("tooltipX");
      localStorage.removeItem("tooltipY");
      return;
    }

    const xEntry = payload.find((entry) => entry.dataKey === "x");
    const yEntry = payload.find((entry) => entry.dataKey === "y");

    const extractedX = xEntry?.value;
    const extractedY = yEntry?.value;
    if (extractedX !== undefined && extractedY !== undefined) {
      try {
        localStorage.setItem("tooltipX", String(extractedX));
        localStorage.setItem("tooltipY", String(extractedY));
      } catch (e) {
        console.error(
          "CustomTooltip: 툴팁 좌표를 localStorage에 저장 중 오류 발생:",
          e
        );
      }
    } else {
      localStorage.removeItem("tooltipX");
      localStorage.removeItem("tooltipY");
      console.warn(
        "CustomTooltip: 페이로드에서 유효한 좌표 값을 추출할 수 없습니다."
      );
    }
  }, [active, payload]);
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          fontSize: "14px",
          color: "#333",
        }}
      >
        {payload.map((entry, index) => {
          if (!entry) return null;
          return (
            <div key={`item-${index}`}>
              {entry.name ?? "N/A"}: {entry.value ?? "N/A"}
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};

const Graph = ({ data, handleClick, onNodeDragEnd }) => {
  const filteredData = data.filter((item) => {
    return item.x >= 0 && item.x <= 30 && item.y >= 0 && item.y <= 30;
  });

  const ticks = Array.from({ length: 31 }, (_, i) => i);

  const fakeData = [];
  for (let y = 0; y < 31; y++) {
    for (let x = 0; x < 31; x++) {
      fakeData.push({ x, y });
    }
  }

  return (
    <ResponsiveContainer width="100%" height={600}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis
          type="number"
          dataKey="x"
          name="X-coordinate"
          domain={[0, 30]}
          ticks={ticks}
          interval={0}
        />

        <YAxis
          type="number"
          dataKey="y"
          name="Y-coordinate"
          domain={[0, 30]}
          ticks={ticks}
        />

        <Tooltip content={<CustomTooltip />} />

        <Scatter
          name="Invisible Grid"
          data={fakeData} // 이 데이터의 좌표가 툴팁 payload로 전달됩니다.
          fill="transparent"
          stroke="transparent"
          r={5} // 마우스 오버 감지 영역 반지름
          activeDot={{ r: 5, stroke: "#ccc", fill: "rgba(0,0,0,0.1)" }}
          isAnimationActive={false}
        />

        <Scatter
          name="Actual Data"
          data={filteredData}
          shape={(props) => (
            <Node
              {...props}
              handleClick={handleClick}
              onNodeDragEnd={onNodeDragEnd}
            />
          )}
          fill="#8884d8"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Graph;
