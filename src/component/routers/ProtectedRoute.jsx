import {Navigate} from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  if (sessionStorage.getItem("accessToken")?.length > 120) {
    return children;
  }

  return <Navigate to="/assignment" replace />;
};

export default ProtectedRoute;
