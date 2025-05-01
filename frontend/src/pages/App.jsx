import React from "react";
import Graph from "../components/planVisualizer/Graph";
import List from "../components/planVisualizer/List";
import DataVisualizer from "../components/planVisualizer/DataVisualizer";
import styled from "styled-components";
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
    display: flex;
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
        </DataVisualizer>
      </Viewer>

      <p>Copyright 2025. BedRockTeam All rights reserved.</p>
    </Style>
  );
}

export default App;
