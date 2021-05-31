import React from "react";
import ic_success from "../img/ic_success.png";
import "../css/SuccessPopup.css";

function SuccessPopup() {
  return (
    <div className="SuccessPopup-main-background">
      <div className="SuccessPopup-container-background">
        <div className="SuccessPopup-image-text-container">
          <img src={ic_success} />
          <span>Success</span>
        </div>
        <button className="SuccessPopup-go-back-button">
          GO BACK TO DASHBOARD
        </button>
      </div>
    </div>
  );
}

export default SuccessPopup;
