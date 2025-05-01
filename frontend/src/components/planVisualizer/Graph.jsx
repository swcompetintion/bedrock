import React from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
} from "recharts";
import Node from "./Node";

const Graph = ({ data, handleClick }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart>
        <XAxis dataKey="x" />
        <YAxis dataKey="y" />
        <Scatter
          data={data}
          shape={<Node data={data} handleClick={handleClick} />}
          fill="#8884d8"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Graph;
