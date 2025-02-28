import React from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store"; // Import Redux store
import Profile from '../src/pages/Profile'
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Forgot from "./components/Forgot";
import ResetPassword from "./components/ResetPassword";
import ResourceShow from "./pages/ResourceShow";
import Post from '../src/pages/Post'

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/dashboard/topic-description/:seoName"
          element={<ResourceShow />}
        />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/dashboard/post" element={<Post/>} />
      </Routes>
    </Provider>
  );
}

export default App;
