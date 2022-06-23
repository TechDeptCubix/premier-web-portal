import React, {useRef} from "react";
import logo from "../img/premier_logo.png";
import "../css/Header.css";
import { useLocation, Link } from "react-router-dom";
import ic_dropdown_arrow from "../img/ic_dropdown_arrow.png";
import { useState, useEffect, useContext } from "react";
import LogoutPopup from "../components/LogoutPopup";
import axios from "axios";
import { AppContext } from "../context/AppContext";

function Header() {

  const companyName = useRef("vv");
  let isUserLoggedInFlag = false;
  const { state } = useContext(AppContext);

  if (state.isAdminLoggedIn) {
    console.log("Context user logged in ");
    isUserLoggedInFlag = true;
  }

  const getHeaderData = () => {
    // get company code from local storage , then call API using that code

    let current_company_local = localStorage.getItem("current_company");
    let currentCompany;
    if (current_company_local) {
      currentCompany = JSON.parse(current_company_local);

      console.log("Home page company value is  ", currentCompany);
      companyName.current = currentCompany.company_name;


      const apiUrl = `https://api-eproc.premierauto.ae/api/CustomerInform/${currentCompany.company_code}`;
      axios
        .get(apiUrl)
        .then((res) => {
          console.log("balance and credit is  ", res.data);
          setCreditAndBalance(res.data);
        })
        .catch((e) => {
          console.log("something went wrong");
        });

    }
  };

  const initialCreditAndBalance = [
    {
      credit_limit: 5,
      balance: 5,
    },
  ];
  const [creditAndBalance, setCreditAndBalance] = useState(
    initialCreditAndBalance
  );

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

  useEffect(() => {
    console.log('mounted');
    return () => console.log('unmounting...');
  }, [])  // <-- add this empty array here


  useEffect(() => {
    if (isUserLoggedInFlag) {
      console.log("useEffect user logged in Header.js ");
      getHeaderData();
    }
  }, [isUserLoggedInFlag]);

  return (
    <div className={splitLocation[1] === "" ? "hideLoginContainer" : ""}>
      <div className="Header-logo-container">
        <Link to="/home">
          <img src={logo} className="Header-logo shimmer" alt="logo" />
        </Link>

        <div className="Header-balance-statistics-container">

          <div className="welcome-company-name-container">
            <span>{companyName.current}</span>
          </div>
          <div className="Header-credit-balance-container">
            <div>
              <span className="Header-balance-label">Credit Limit </span> :{" "}
              <span className="Header-balance-value">
                {creditAndBalance[0] ? creditAndBalance[0].credit_limit : ""}
              </span>{" "}
            </div>
            <div>
              <span className="Header-balance-label">Balance</span> :{" "}
              <span className="Header-balance-value">
                {" "}
                {creditAndBalance[0] ? creditAndBalance[0].balance : ""}{" "}
              </span>{" "}
            </div>
          </div>
          
        </div>
      </div>

      <nav className="Header-nav">
        <ul>
          <li>
            <Link
              to="/home"
              className={splitLocation[1] === "home" ? "active" : ""}
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
                splitLocation[1] === "listOfReturn" ||
                splitLocation[1] === "viewEnquiry" ||
                splitLocation[1] === "orderPlacing" ||
                splitLocation[1] === "viewOrder" ||
                splitLocation[1] === "returnRequest" ||
                splitLocation[1] === "viewReturnRequest"
                  ? "Header-navLink-main-menu active"
                  : "Header-navLink-main-menu"
              }
            >
              Order &amp; Tracking{" "}
              <img
                src={ic_dropdown_arrow}
                className="Header-dropdown-arrow-icon"
                alt="drop down arrow"
              />
            </Link>
            <ul
              className={
                visibilityOfOrderDropDown === "none"
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
