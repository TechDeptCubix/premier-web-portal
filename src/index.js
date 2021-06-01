import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import CreateEnquiry from "./components/CreateEnquiry";
import ListOfEnquiry from "./components/ListOfEnquiry";
import ListOfOrder from "./components/ListOfOrder";
import ListOfReturn from "./components/ListOfReturn";
import ViewReturnRequest from "./components/ViewReturnRequest";
import ViewOrder from "./components/ViewOrder";
import ViewEnquiry from "./components/ViewEnquiry";
import ReturnRequest from "./components/ReturnRequest";
import OrderPlacing from "./components/OrderPlacing";

ReactDOM.render(
  <React.StrictMode>
    <OrderPlacing />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
