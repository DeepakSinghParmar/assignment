import { logo, profile_img } from "../../../assests";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const ProfilePopup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/assignment");
  };

  return (
    <div className="popup" ref={onClose}>
      <ul>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};

export default () => {
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPopupVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  const clickAddButton = () => {
    navigate("/assignment/add-resources");
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="header_right">
          {window.location.pathname === "/assignment/home" ? (
            <button onClick={clickAddButton} className="add-button">
              + ADD
            </button>
          ) : (
            <div></div>
          )}

          <div className="profile-pic" onClick={togglePopup}>
            <img src={profile_img} alt="profile_img" />
          </div>
        </div>
      </div>
      {popupVisible && <ProfilePopup onClose={popupRef} />}
    </>
  );
};
