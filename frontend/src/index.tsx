import { createRoot, Root } from "react-dom/client"; // createRoot와 Root 타입을 import 합니다.
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./pages/Workshop";

// Main 함수형 컴포넌트의 반환 타입을 React.ReactElement로 명시합니다.
const Main = (): React.ReactElement => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
};

// document.getElementById는 HTMLElement | null 타입을 반환합니다.
const container = document.getElementById("root");

// container가 null이 아님을 단언하거나 (as HTMLElement),
// 또는 null인 경우에 대한 처리를 추가해야 합니다.
// 일반적인 경우 root 엘리먼트가 존재하므로 단언을 사용합니다.
const root = createRoot(container as HTMLElement); // null이 아님을 타입 단언

// root 변수의 타입은 createRoot의 반환 타입인 Root 입니다.
// const root: Root = createRoot(container as HTMLElement); // 명시적으로 타입을 지정할 수도 있습니다.


root.render(
  <React.StrictMode>
    {/* 개발 모드에서 추가적인 검사를 위해 StrictMode로 감싸야됨
    나중에 대회에서 배포할때 까먹지 말고 풀어서 빌드 할것*/}
    <Main />
  </React.StrictMode>
);
