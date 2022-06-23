import React, { useState, useContext, useEffect } from "react";
import "../css/Login.css";
import logo from "../img/premier_logo.png";
import backgroundImageLogin from "../img/backgroundImageLogin.png";
import loginBgImage2 from "../img/login_bg_image-2.jpg";
import brandlogoitem1 from "../img/mitsubishi_logo.png";
import cubix_logo from "../img/cubix_logo.png";

import fuso_logo from "../img/fuso_logo.png";
import hyundai_logo from "../img/hyundai_logo.png";
import Infiniti_logo from "../img/Infiniti_logo.png";
import isuzu_logo from "../img/isuzu_logo.png";
import lexus_logo from "../img/lexus_logo.png";
import mazda_logo from "../img/mazda_logo.png";
import nissan_logo from "../img/nissan_logo.png";
import peugeot_logo from "../img/peugeot_logo.png";
import renault_logo from "../img/renault_logo.png";
import toyota_logo from "../img/toyota_logo.png";

import part_1 from "../img/part_1.png";
import part_2 from "../img/part_2.png";
import part_3 from "../img/part_3.png";
import part_4 from "../img/part_4.png";
import part_5 from "../img/part_5.png";
import part_6 from "../img/part_6.png";
import part_7 from "../img/part_7.png";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

function Login(props) {
  const { showRegistrationPage } = props;
  const initialValues = {
    username: "",
    userpassword: "",
    error: "",
  };

  const [values, setValues] = useState(initialValues);

  const history = useHistory();

  const { state, changeAdminLoginStatus, changeUserNameStatus } =
    useContext(AppContext);

  const [isSending, setIsSending] = useState(false);

  const [isMachineValid, setIsMachineValid] = useState(false);

  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    console.log("Login component >>>>>>> MOunted ");
    // disable button till the machine is validated
    setIsSending(true);

    const validateMachine = () => {
      let current_machineguid = JSON.parse(
        localStorage.getItem("current_machineguid")
      );

      if (JSON.parse(localStorage.getItem("current_company"))) {
        let company_name = JSON.parse(
          localStorage.getItem("current_company")
        ).company_name;
        setCompanyName(company_name);
      }

      let apiUrl;

      if (current_machineguid) {
        apiUrl = `https://api-eproc.premierauto.ae/api/ValidMachine/${current_machineguid.machineguid}`;
      }

      console.log("inside validate Machine apiUrl ", apiUrl);
      axios
        .get(apiUrl)
        .then((res) => {
          if (res.data.length > 0) {
            console.log("Yess valid Machine");
            // if success, enable Login Button
            setIsSending(false);
            setIsMachineValid(true);
          } else {
            console.log("machine not validated, Register machine");
            setIsMachineValid(false);
            showRegistrationPage();
          }
        })
        .catch((e) => {
          console.log("Eror while validating machine ", e);
          //if any technical error  refresh the page
        });
    };

    validateMachine();
    return function cleanup() {
      console.log("Login component unmounted ");
    };
  }, [showRegistrationPage]);

  if (isMachineValid) {
    console.log("inside  if (isMachineValid) ");

    if (state.isAdminLoggedIn) {
      console.log("inside  if (state.isAdminLoggedIn)");
      history.push("/home");
    }
  }

  const validateInput = () => {
    if (values.username.length > 0 && values.userpassword.length > 0) {
      setValues({
        ...values,
        error: "",
      });

      return true;
    } else {
      console.log("username password empty");

      setValues({
        ...values,
        error: "Please enter valid username and password",
      });

      return false;
    }
  };

  const sendRequest = () => {
    // disable button till success or failure result
    if (isSending) return;

    // update state of Button
    setIsSending(true);
    console.log("button clicked");

    // first validate input values
    validateInput();

    // after values are validated , sendRequest

    if (validateInput()) {
      //get company code from local storage
      let current_company = localStorage.getItem("current_company");
      let currentCompany;
      if (current_company) {
        currentCompany = JSON.parse(localStorage.getItem("current_company"));

        console.log("current_machineguid value is  ", currentCompany);
      }

      console.log(
        "validateInput success call api uname pwd is ",
        values.username,
        values.userpassword
      );
      const apiUrl = `https://api-eproc.premierauto.ae/api/validuser/${currentCompany.company_code}/${values.username}/${values.userpassword}`;

      setValues({
        ...values,
        error: "Checking user ....",
      });

      axios
        .get(apiUrl)
        .then((res) => {
          console.log("api response ", res);

          if (res.data.length > 0) {
            document.cookie =
              "currentSatusLog=" +
              JSON.stringify({
                isAdminLoggedIn: true,
              });
            document.cookie =
              "currentSatusLogUser=" +
              JSON.stringify({ user: values.username });

            // enable button again
            //setIsSending(false);

            changeAdminLoginStatus(true);
          } else {
            setValues({
              ...values,
              error: "Username or password is not correct",
            });

            console.log("API response username password not correct");

            // enable button again
            setIsSending(false);
          }
        })
        .catch((e) => {
          console.log("something went wrong ", e);
          setValues({
            ...values,
            error: "Something went wrong, Please try again ",
          });
          // enable button again
          setIsSending(false);
        });
    } else {
      console.log(" validateInput returned false");
      // enable button again
      setIsSending(false);
    }
  };

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  return (
    <div className="Login-page-height">
      <div className="Login-logo-container">
        <img
          alt="placeholder"
          src={logo}
          className="Login-header-logo shimmer"
        />
      </div>

      <div className="Login-main-section">
        <div className="Login-bg-image-container">
          <img
            alt="placeholder"
            src={backgroundImageLogin}
            className="Login-image-bg-first"
          />
          <img
            alt="placeholder"
            src={loginBgImage2}
            className="Login-image-bg-second"
          />
        </div>

        <div className="Login-main-section-content">
          <h2>Welcome to Premier’s e-procurement</h2>

          <h3>{companyName}</h3>
          <form className="Login-form">
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={values.username}
              onChange={handleInputChange}
            />

            <input
              type="password"
              name="userpassword"
              placeholder="Enter password"
              value={values.userpassword}
              onChange={handleInputChange}
            />
            <input
              type="button"
              value="LOGIN"
              className="Login-submit"
              disabled={isSending}
              onClick={sendRequest}
            />
            <label className="Login-form-error-label">{values.error}</label>
          </form>
          <div className="Login-pqp-items-carousel">
            <ul>
              <li>
                <img alt="placeholder" src={part_1} />
              </li>
              <li>
                <img alt="placeholder" src={part_2} />
              </li>
              <li>
                <img alt="placeholder" src={part_3} />
              </li>
              <li>
                <img alt="placeholder" src={part_4} />
              </li>
              <li>
                <img alt="placeholder" src={part_5} />
              </li>
              <li>
                <img alt="placeholder" src={part_6} />
              </li>
              <li>
                <img alt="placeholder" src={part_7} />
              </li>
            </ul>
          </div>
          <div className="Login-brand-list-container">
            <ul>
              <li>
                <img alt="placeholder" src={brandlogoitem1} />
              </li>
              <li>
                <img alt="placeholder" src={toyota_logo} />
              </li>
              <li>
                <img alt="placeholder" src={fuso_logo} />
              </li>
              <li>
                <img alt="placeholder" src={hyundai_logo} />
              </li>
              <li>
                <img alt="placeholder" src={Infiniti_logo} />
              </li>
              <li>
                <img alt="placeholder" src={isuzu_logo} />
              </li>
              <li>
                <img alt="placeholder" src={lexus_logo} />
              </li>
              <li>
                <img alt="placeholder" src={mazda_logo} />
              </li>
              <li>
                <img alt="placeholder" src={nissan_logo} />
              </li>
              <li>
                <img alt="placeholder" src={peugeot_logo} />
              </li>
              <li>
                <img alt="placeholder" src={renault_logo} />
              </li>
            </ul>
          </div>

          <div className="Login-bottom-bar">
            <div className="Login-bottom-strip-content">
              {" "}
              <span>powered by </span>
              <img alt="placeholder" src={cubix_logo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
