import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import CreateEnquiry from "./components/CreateEnquiry";
import ListOfEnquiry from "./components/ListOfEnquiry";
import ListOfOrder from "./components/ListOfOrder";

ReactDOM.render(
  <React.StrictMode>
    <ListOfOrder />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
