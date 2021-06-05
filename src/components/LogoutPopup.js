import React from "react";
import ic_success from "../img/ic_success.png";
import "../css/LogoutPopup.css";

function LogoutPopup(props) {
  const { showLogoutPopup } = props;

  return (
    <div className="LogoutPopup-main-background">
      <div className="LogoutPopup-container-background">
        <div className="LogoutPopup-image-text-container">
          <span>Log Out</span>
          <p>Are you sure?</p>
        </div>
        <div className="LogoutPopup-buttonContainer">
          <button
            className="LogoutPopup-go-back-button LogoutPopup-cancel-button"
            onClick={() => showLogoutPopup(false)}
          >
            Cancel
          </button>
          <button className="LogoutPopup-go-back-button">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default LogoutPopup;
