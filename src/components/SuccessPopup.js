import React from "react";
import ic_success from "../img/ic_success.png";
import "../css/SuccessPopup.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function SuccessPopup(props) {
  return (
    <div className="SuccessPopup-main-background">
      <div className="SuccessPopup-container-background">
        <div className="SuccessPopup-image-text-container">
          <img src={ic_success} />
          <span>Success</span>
        </div>

        <Link to="/" className="SuccessPopup-go-back-button">
          {" "}
          GO BACK TO DASHBOARD
        </Link>
      </div>
    </div>
  );
}

export default SuccessPopup;
