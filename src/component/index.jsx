import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./modules/Home";
import AddResources from "./modules/AddResources";
import Login from "./modules/login";

export default () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")?.length > 120) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [sessionStorage.getItem("accessToken")]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/assignment" element={<Login />} />
          <Route
            path="/assignment/home"
            element={isAuth ? <Home /> : <Navigate to="/assignment" replace />}
          />
          <Route
            path="/assignment/add-resources"
            element={isAuth ? <AddResources /> : <Navigate to="/assignment" replace />}
          />
          <Route path="*" element={<h1>No found page</h1>} />
        </Routes>
      </Router>
    </>
  );
};
