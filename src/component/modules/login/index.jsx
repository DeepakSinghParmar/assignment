import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { fetchAlldata } from "../../redux/actions/AllDataActions";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = sessionStorage.getItem("accessToken");

    if (isAuth && isAuth.length > 120) {
      setLoading(false);
      fetchAlldata(dispatch);
      navigate("/home");
    } else {
      setLoading(false);
    }
  }, [navigate]);

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

      window.location.replace("/home");
    } else {
      setErrors(errors);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <>
      <ToastContainer />
      <div className="login-main">
        <div className="login-container">
          <div className="login-form">
            <h1>Login</h1>
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
