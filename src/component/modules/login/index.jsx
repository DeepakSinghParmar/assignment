import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { fetchAlldata } from "../../redux/actions/AllDataActions";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { logo } from "../../../assests";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (sessionStorage.getItem("accessToken")?.length > 120) {
    return <Navigate to="/assignment/home" replace />;
  }

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Phone no is required.";
    } else if (!/^\d{10}$/.test(email)) {
      errors.email = "Phone no is invalid.";
    }
    if (!password) {
      errors.password = "Password is required.";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      sessionStorage.setItem(
        "accessToken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      );
      fetchAlldata(dispatch);

      navigate("/assignment/home");
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login-main">
        <div className="login-container">
          <div className="login-form">
            <img  className="logo" src={logo} alt='Logo'/>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Phone no</label>
                <input
                  type="number"
                  id="phone_no"
                  name="phone_no"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your phone no"
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
