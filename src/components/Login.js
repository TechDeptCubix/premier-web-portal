import React from "react";
import "../css/Login.css";
import logo from "../img/premier_logo.png";
import backgroundImageLogin from "../img/backgroundImageLogin.png";
import loginBgImage2 from "../img/login_bg_image-2.jpg";
import pqpItem1 from "../img/pqpitem1.png";
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

function Login() {
  const history = useHistory();

  const formSubmission = (e) => {
    e.preventDefault();
    console.log("form submitted");
    history.push("/home");
  };

  return (
    <div className="Login-page-height">
      <div className="Login-logo-container">
        <img src={logo} className="Login-header-logo" />
      </div>

      <div className="Login-main-section">
        <div className="Login-bg-image-container">
          <img src={backgroundImageLogin} className="Login-image-bg-first" />
          <img src={loginBgImage2} className="Login-image-bg-second" />
        </div>

        <div className="Login-main-section-content">
          <h2>Welcome to Premier’s e-procurement</h2>

          <form className="Login-form" onSubmit={formSubmission}>
            <input type="text" name="username" placeholder="Enter username" />
            <input
              type="password"
              name="userpassword"
              placeholder="Enter password"
            />
            <input type="submit" value="LOGIN" className="Login-submit" />
          </form>
          <div className="Login-pqp-items-carousel">
            <ul>
              <li>
                <img src={part_1} />
              </li>
              <li>
                <img src={part_2} />
              </li>
              <li>
                <img src={part_3} />
              </li>
              <li>
                <img src={part_4} />
              </li>
              <li>
                <img src={part_5} />
              </li>
              <li>
                <img src={part_6} />
              </li>
              <li>
                <img src={part_7} />
              </li>
            </ul>
          </div>

          <div className="Login-bottom-bar">
            <div className="Login-brand-list-container">
              <ul>
                <li>
                  <img src={brandlogoitem1} />
                </li>
                <li>
                  <img src={toyota_logo} />
                </li>
                <li>
                  <img src={fuso_logo} />
                </li>
                <li>
                  <img src={hyundai_logo} />
                </li>
                <li>
                  <img src={Infiniti_logo} />
                </li>
                <li>
                  <img src={isuzu_logo} />
                </li>
                <li>
                  <img src={lexus_logo} />
                </li>
                <li>
                  <img src={mazda_logo} />
                </li>
                <li>
                  <img src={nissan_logo} />
                </li>
                <li>
                  <img src={peugeot_logo} />
                </li>
                <li>
                  <img src={renault_logo} />
                </li>
              </ul>
            </div>
            <div className="Login-bottom-strip-content">
              {" "}
              <span>powered by </span>
              <img src={cubix_logo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
