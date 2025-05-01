import React from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
} from "recharts";
import Node from "./Node";

const Graph = ({ data, handleClick, onNodeDragEnd }) => {
  const filteredData = data.filter((item) => {
    return item.x >= 0 && item.x <= 30 && item.y >= 0 && item.y <= 30;
  });

  const ticks = Array.from({ length: 31 }, (_, i) => i);

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
        <Scatter
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
