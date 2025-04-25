import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./pages/App";
const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
};
const container = document.getElementById("root"); // 렌더링할 DOM 엘리먼트 (일반적으로 index.html의 <div id="root"></div>)
const root = createRoot(container); // createRoot 함수를 사용하여 React 루트를 생성
root.render( // 생성된 루트에 React 엘리먼트를 렌더링
    <React.StrictMode> {/* 개발 모드에서 추가적인 검사를 위해 StrictMode로 감싸는 것이 권장됩니다. */}
      <Main />
    </React.StrictMode>
  );