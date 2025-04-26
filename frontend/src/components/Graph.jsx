import React, { useState } from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis } from 'recharts';
import { initialData } from '../tests/DummyData'; // DataPoint 클래스를 불러옵니다.


const Graph = () => {
  const [data] = useState(initialData);


  const handleClick = (item) => {
    alert(`Clicked on: ${item.name}`);
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart>
        <XAxis dataKey="x" />
        <YAxis dataKey="y" />
        <Scatter
          data={data}
          fill="#8884d8"
          onClick={handleClick}
          onMouseOver={()=> {
            console.log('Mouse over');
          }}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Graph;
