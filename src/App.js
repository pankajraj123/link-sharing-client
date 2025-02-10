import React from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store"; // Import Redux store

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Forgot from "./components/Forgot";
import ResetPassword from "./components/ResetPassword";
import ResourceShow from "./pages/ResourceShow";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/dashboard/topicDescription/:formattedTopicName"
          element={<ResourceShow />}
        />
        <Route path="/forgotpassword" element={<Forgot />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
      </Routes>
    </Provider>
  );
}

export default App;
