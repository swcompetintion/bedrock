// /app/frontend/src/App.jsx 예시
import React from "react"; // React를 사용하므로 import 해야 합니다.
import Graph from "../components/Graph"; // Graph 컴포넌트를 import 합니다.
import List from "../components/List"; // List 컴포넌트를 import 합니다.
import DataVisualizer from "../components/DataVisualizer"; // DataVisualizer를 import 합니다.
import styled from "styled-components"; // styled-components를 사용하기 위해 import 합니다.

const Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

function App() {
  return (
    <Style>
      <h1>베드락 플래너</h1>
      {/* Graph와 List 컴포넌트를 DataVisualizer로 감싸서 사용 */}
      <DataVisualizer>
        <Graph />{" "}
        {/* DataVisualizer로부터 data와 handleClick을 props로 받습니다. */}
        <List />{" "}
        {/* DataVisualizer로부터 data와 handleClick을 props로 받습니다. */}
      </DataVisualizer>
      <p>이것은 App 컴포넌트의 내용입니다.</p>
    </Style>
  );
}

export default App; // 다른 파일에서 import 할 수 있도록 export 합니다.
