// /app/frontend/src/App.jsx 예시
import React from "react"; // React를 사용하므로 import 해야 합니다.
import Graph from "../components/planVisualizer/Graph"; // Graph 컴포넌트를 import 합니다.
import List from "../components/planVisualizer/List"; // List 컴포넌트를 import 합니다.
import DataVisualizer from "../components/planVisualizer/DataVisualizer"; // DataVisualizer를 import 합니다.
import styled from "styled-components"; // styled-components를 사용하기 위해 import 합니다.
import Writer from "../components/planForm/Writer";
const Style = styled.div`
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  section {
    width: 100%;
    display: flex; /* 플렉스 컨테이너로 설정 */
    justify-content: space-between;
  }
  section > button {
    margin: 10px;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;
const Viewer = styled.div`
  width: 80%;
  position: relative;
`;
function App() {
  const [isList, setIsList] = React.useState(true);

  return (
    <Style>
      <h1>베드락 플래너</h1>
      <Viewer>
        <DataVisualizer>
          <Graph />{" "}
          <section>
            {isList ? (
              <button
                onClick={() => {
                  setIsList(!isList);
                }}
              >
                플랜 작성
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsList(!isList);
                }}
              >
                플랜 목록
              </button>
            )}
            {isList ? <button>플랜 필터링</button> : <></>}
          </section>
          {isList ? <List /> : <Writer />}
          {/* DataVisualizer로부터 data와 handleClick을 props로 받습니다. */}
        </DataVisualizer>
      </Viewer>
      {/* DataForm 컴포넌트 추가 */}
      <p>all right deserved us</p>
    </Style>
  );
}

export default App; // 다른 파일에서 import 할 수 있도록 export 합니다.
