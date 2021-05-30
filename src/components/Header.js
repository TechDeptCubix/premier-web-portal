import React from "react";
import logo from "../img/premier_logo.png";
import "../css/Header.css";

function Header() {
  return (
    <div>
      <div className="Header-logo-container">
        <img src={logo} className="Header-logo" />

        <div className="Header-balance-statistics-container">
          <div className="Header-credit-balance-container">
            <div>
              <span className="Header-balance-label">Credit Limit </span> :{" "}
              <span className="Header-balance-value">{1000 + 2}</span>{" "}
            </div>
            <div>
              <span className="Header-balance-label">Balance</span> :{" "}
              <span className="Header-balance-value"> {700 + 1} </span>{" "}
            </div>
          </div>

          <div className="Header-statistics-container">
            <p>
              Pending <span>{45}</span> Accepted <span>{22}</span> Processing{" "}
              <span>{56}</span>
            </p>
          </div>
        </div>
      </div>

      <nav className="Header-nav">
        <ul>
          <li>Home</li>
          <li>Order & Tracking</li>
          <li>View Order Statistics </li>
          <li>Help</li>
          <li>Contact</li>
          <li>Logout</li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
