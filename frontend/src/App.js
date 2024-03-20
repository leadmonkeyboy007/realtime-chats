import React from "react";
import {Link, Route, Routes} from "react-router-dom";

import Messenger from "./pages/Messenger/Messenger";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="container">
      <nav>
        <ul>
          <Link to="/" class="list">
            Home
          </Link>
          <Link to="/messenger" class="list">
            Messenger
          </Link>
        </ul>
      </nav>

      {/* Defining routes path and rendering components as element */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/messenger" element={<Messenger />} />
      </Routes>
    </div>
  );
}

export default App;
