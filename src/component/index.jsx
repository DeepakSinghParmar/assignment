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
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={isAuth ? <Home /> : <Navigate to="/" replace />}
          />
          <Route
            path="/add-resources"
            element={isAuth ? <AddResources /> : <Navigate to="/" replace />}
          />
          <Route path="*" element={<h1>No found page</h1>} />
        </Routes>
      </Router>
    </>
  );
};
