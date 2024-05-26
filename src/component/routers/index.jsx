import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../modules/Home";
import AddResources from "../modules/AddResources";
import Login from "../modules/login";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/assignment" element={<Login />} />
          <Route
            path="/assignment/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assignment/add-resources"
            element={
              <ProtectedRoute>
                <AddResources />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/assignment" replace />} />
        </Routes>
      </Router>
    </>
  );
};

export default Routers;
