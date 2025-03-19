// import { useState } from "react";
import Home from "./Components/Home";
// import DarkMode from "./Components/DarkMode";
// import "remixicon/fonts/remixicon.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Exchanges from "./Components/Exchanges";
import HistoricalData from "./Components/HistoricalData";
import LiveMarket from "./Components/LiveMarket";
import Assets from "./Components/Assets";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/livemarket" element={<LiveMarket />} />
        <Route path="/exchanges" element={<HistoricalData />} />
      </Routes>
    </>
  );
}

export default App;
