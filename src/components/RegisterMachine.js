import React, { useState, useEffect, useContext } from "react";
import "../css/SystemRegister.css";
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
import axios from "axios";
import { AppContext } from "../context/AppContext";

function RegisterMachine(props) {
  const { state, changeCompanyCodeStatus } = useContext(AppContext);
  useEffect(() => {
    console.log("Register Machine component >>>>>>> MOunted ");

    return function cleanup() {
      console.log("Register Machine component <<<<<<< unmounted ");
    };
  }, []);

  const { showLoginPageAfterRegistration } = props;
  const initialValues = {
    company_name: "",
    company_code: "",
    system_key: "",
    error: "",
  };

  const [values, setValues] = useState(initialValues);

  const [isSending, setIsSending] = useState(false);

  const validateInput = () => {
    if (values.company_name.length > 0 && values.company_code.length > 0) {
      setValues({
        ...values,
        error: "",
      });

      return true;
    } else {
      console.log("company_name company_code empty");

      setValues({
        ...values,
        error: "Please enter valid company_name and company_code",
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
      const apiUrl = `https://api-eproc.premierauto.ae/api/RegisterMachine/${values.system_key}/${values.company_code}/${values.company_name}`;

      console.log(
        "validateInput success call api company_name company_code is ",
        values.company_name,
        values.company_code,
        values.system_key
      );

      console.log("API URL is ", apiUrl);

      setValues({
        ...values,
        error: "Registering Machine ....",
      });

      axios
        .get(apiUrl)
        .then((res) => {
          console.log("api response ", res);
          // is return data is as expected "QpwL5tke4Pnpja7X4" changeAdminLoginStatus(true);
          if (res.data.length) {
            console.log("API response array size is ", res.data.length);
            // set both context and localStorage to true ,
            // hence context will go to home asynchronously and will prevent from <ProtectedRoute going back
            // because localStorage may not be set to true because of latency
            // after localStorage value is set even if page refreshed no problem
            // because we have put or condition in protected route
            // any of localStorage or context set to true will prevent <ProtectedRoute from going back

            localStorage.setItem(
              "current_machineguid",
              JSON.stringify({ machineguid: res.data[0].machineguid })
            );

            localStorage.setItem(
              "current_company",
              JSON.stringify({
                company_code: values.company_code,
                company_name: values.company_name,
              })
            );

            // set company code in context because it may be required by every component

            changeCompanyCodeStatus(values.company_code);
            // enable button again
            setIsSending(false);

            // now show Login Compponent
            showLoginPageAfterRegistration();
          } else {
            setValues({
              ...values,
              error:
                "company name or company code or system key is not correct",
            });

            console.log(
              "API response company name or company code or system key is not correct"
            );

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

      // axios
      //   .get(apiUrl)
      //   .then((res) => {
      //     console.log(" dummy api result ", res);
      //   })
      //   .catch((e) => {
      //     console.log("Error in api call ", e);
      //   });
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
        <img alt="placeholder" src={logo} className="Login-header-logo" />
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
          <h5>Register Machine</h5>
          <form className="Login-form">
            <input
              type="text"
              name="company_name"
              placeholder="Enter Company Name"
              value={values.company_name}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="company_code"
              placeholder="Enter Company Code"
              value={values.userpassword}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="system_key"
              placeholder="Enter System Key"
              value={values.system_key}
              onChange={handleInputChange}
            />

            <input
              type="button"
              value="REGISTER"
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

          <div className="Login-bottom-bar">
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

export default RegisterMachine;
