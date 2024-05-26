import React, { useEffect, useState } from "react";
import Routers from "./routers";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ScreenLoader from "./modules/ScreenLoader";
import { fetchAlldata } from "./redux/actions/AllDataActions";

export default () => {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);

  const computeIsAuth = async () => {
    const getToken = sessionStorage.getItem("accessToken")?.length > 120;

    if (getToken) {
      fetchAlldata(dispatch);
      setTimeout(() => {
        setIsAuth(true);
        return <Navigate to="/assignment/home" replace />;
      }, 1500);
    } else {
      sessionStorage.clear();

      setTimeout(() => {
        setIsAuth(true);
        return <Navigate to="/assignment" replace />;
      }, 1500);
    }
  };

  useEffect(() => {
    computeIsAuth();
  }, []);

  return <>{isAuth ? <Routers /> : <ScreenLoader />}</>;
};
