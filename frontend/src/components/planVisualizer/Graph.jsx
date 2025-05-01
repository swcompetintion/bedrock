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
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis type="number" dataKey="x" name="X-coordinate" />{" "}
        <YAxis type="number" dataKey="y" name="Y-coordinate" />{" "}
        <Scatter
          data={data}
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
