import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
<<<<<<< HEAD
import Workshop from "./pages/Workshop";
import Login from "./pages/Login";
=======
import Workshop from "./pages/Workshop"; // 보여질 페이지 가져옴옴
>>>>>>> e7f0d01 (주석)
import React from "react";

const Main = (): React.ReactElement => { // Main 컴포넌트의 반환 타입이 하나의 Ract 요소
  return (
    <Router>   
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/:userId" element={<Workshop />} />
        <Route path="/:userId/" element={<Workshop />} />
      </Routes>
    </Router>
  );
}; 

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
