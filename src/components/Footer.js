import React from "react";
import cubix_logo from "../img/cubix_logo.png";
import "../css/Footer.css";

function Footer() {
  return (
    <div>
      <div className="Footer-bottom-strip-content">
        <span>powered by </span>
        <img src={cubix_logo} />
      </div>
    </div>
  );
}

export default Footer;
