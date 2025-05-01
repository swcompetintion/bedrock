import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import ClickableScatterChart from "./pages/Bpp";
const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/test" element={<ClickableScatterChart />} />
      </Routes>
    </Router>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    {/* 개발 모드에서 추가적인 검사를 위해 StrictMode로 감싸야됨 
    나중에 대회에서 배포할때 까먹지 말고 풀어서 빌드 할것*/}
    <Main />
  </React.StrictMode>
);
