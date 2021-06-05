import React from "react";
import logo from "../img/premier_logo.png";
import "../css/Header.css";
import { useLocation, Link } from "react-router-dom";
import ic_dropdown_arrow from "../img/ic_dropdown_arrow.png";
import { useState } from "react";
import LogoutPopup from "../components/LogoutPopup";

function Header() {
  const [visibilityOfOrderDropDown, setVisibilityOfOrderDropDown] =
    useState("none");

  const location = useLocation();

  const { pathname } = location;

  const splitLocation = pathname.split("/");

  const [logoutPopupStatus, setlogoutPopupStatus] = useState(false);

  const closeDropDown = (e) => {
    if (e.target.tagName === "A") {
      console.log("Link clicked");
      setVisibilityOfOrderDropDown("none");
    }
  };

  const showLogoutPopup = () => {
    console.log("clicked somthing");
    setlogoutPopupStatus(!logoutPopupStatus);
  };

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
          <li>
            <Link
              exact
              to="/"
              className={splitLocation[1] === "" ? "active" : ""}
            >
              Home
            </Link>
          </li>
          <li
            onClick={closeDropDown}
            onMouseOver={() => setVisibilityOfOrderDropDown("block")}
            onMouseLeave={() => setVisibilityOfOrderDropDown("none")}
          >
            <Link
              to="/createEnquiry"
              className={
                splitLocation[1] === "createEnquiry" ||
                splitLocation[1] === "listOfEnquiry" ||
                splitLocation[1] === "listOfOrder" ||
                splitLocation[1] === "listOfReturn"
                  ? "Header-navLink-main-menu active"
                  : "Header-navLink-main-menu"
              }
            >
              Order &amp; Tracking{" "}
              <img
                src={ic_dropdown_arrow}
                className="Header-dropdown-arrow-icon"
              />
            </Link>
            <ul
              className={
                visibilityOfOrderDropDown == "none"
                  ? "Header-nav-orderAndtracking-subMenu"
                  : "Header-nav-orderAndtracking-subMenu Header-show-drop-down"
              }
            >
              <li className="Header-orderAndtracking-navList-item">
                <Link to="/createEnquiry" className="Header-navLink">
                  Create Enquiry
                </Link>
              </li>

              <li className="Header-orderAndtracking-navList-item">
                <Link to="/listOfEnquiry" className="Header-navLink">
                  List of Enquiry
                </Link>
              </li>
              <li className="Header-orderAndtracking-navList-item">
                <Link to="/listOfOrder" className="Header-navLink">
                  List of Order
                </Link>
              </li>
              <li className="Header-orderAndtracking-navList-item">
                <Link to="/listOfReturn" className="Header-navLink">
                  List of Return
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link
              to="/viewOrderStatistics"
              className={
                splitLocation[1] === "viewOrderStatistics" ? "active" : ""
              }
            >
              View Order Statistics
            </Link>{" "}
          </li>
          <li>
            <Link
              to="/help"
              className={splitLocation[1] === "help" ? "active" : ""}
            >
              Help
            </Link>{" "}
          </li>
          <li>
            <Link
              to="/contact"
              className={splitLocation[1] === "contact" ? "active" : ""}
            >
              Contact
            </Link>{" "}
          </li>
          <li className="Header-nav-logout" onClick={showLogoutPopup}>
            Logout
          </li>
        </ul>
      </nav>
      {logoutPopupStatus && <LogoutPopup showLogoutPopup={showLogoutPopup} />}
    </div>
  );
}

export default Header;
