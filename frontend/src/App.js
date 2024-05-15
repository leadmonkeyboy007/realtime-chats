import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Topbar from "./components/topbar/Topbar";

import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Messenger from "./pages/messenger/Messenger";


function App() {
  return (
    <div className="container">
      <Topbar />

      {/* Defining routes path and rendering components as element */}
      <Router>
        <Routes>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/profile/:username">
            <Profile />
          </Route>
          <Route path="/messenger">
            <Messenger />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
