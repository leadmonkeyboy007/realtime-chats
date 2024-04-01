import React from "react";
import { Route, Routes, Redirect } from "react-router-dom";

import Topbar from "./components/topbar/Topbar";

import Messenger from "./pages/Messenger/Messenger";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="container">
      <Topbar />

      {/* Defining routes path and rendering components as element */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/messenger" element={<Messenger />} />
      </Routes>
    </div>
  );
}

export default App;
