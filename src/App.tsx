import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./routes/Home";
import Level1 from "./routes/Level1";
import Level1half from "./routes/Level1half";
import Level2 from "./routes/Level2";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/level1/*" element={<Level1 />} />
        <Route path="/level1half" element={<Level1half />} />
        <Route path="/level2" element={<Level2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
