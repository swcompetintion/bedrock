import React from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
} from "recharts";

const Graph = ({ data, handleClick }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart>
        <XAxis dataKey="x" />
        <YAxis dataKey="y" />
        <Scatter
          data={data}
          fill="#8884d8"
          onClick={handleClick}
          onMouseOver={() => {
            console.log("Mouse over");
          }}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Graph;
