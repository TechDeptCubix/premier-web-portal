import React from "react";
import "../css/Login.css"
import logo from "../img/premier_logo.png";
import backgroundImageLogin from "../img/backgroundImageLogin.png";
import pqpItem1 from "../img/pqpitem1.png";
import brandlogoitem1 from "../img/mitsubishi_logo.png";
import cubix_logo from "../img/cubix_logo.png";

function Login(){
    return(
        <div>
            <div className="Login-logo-container"><img src={logo}/></div>
           
           <div className="Login-main-section">
            
                <div className="Login-bg-image-container">
                    <img src={backgroundImageLogin} />
                </div>
                <div className="Login-main-section-content">
                    <h2>Welcome to Premier’s e-procurement</h2>

                    <form className="Login-form">
                        <input type="text" name="username" placeholder="Enter username"/>
                        <input type="password" name="userpassword" placeholder="Enter password"/>
                        <input type="submit" value="LOGIN" className="Login-submit"/>
                    </form>
                    <div className="Login-pqp-items-carousel">
                        <ul>
                            <li><img src={pqpItem1} /></li>
                            <li><img src={pqpItem1} /></li>
                            <li><img src={pqpItem1} /></li>
                            <li><img src={pqpItem1} /></li>
                            <li><img src={pqpItem1} /></li>
                            <li><img src={pqpItem1} /></li>
                            <li><img src={pqpItem1} /></li>
                        </ul>
                    </div>

                    <div className="Login-brand-list-container">
                    <ul>
                            <li><img src={brandlogoitem1} /></li>
                            <li><img src={pqpItem1} /></li>
                            <li><img src={pqpItem1} /></li>
                            <li><img src={pqpItem1} /></li>
                            <li><img src={pqpItem1} /></li>
                            <li><img src={pqpItem1} /></li>
                            <li><img src={pqpItem1} /></li>
                        </ul>
                    </div>
                </div>

            </div>

            <div className="Login-bottom-strip">
                    <div> <span>powered by </span><img src={cubix_logo} /></div> 
            </div>
        </div>
    )
}

export default Login;