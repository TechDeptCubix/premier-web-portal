import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../css/ListOfEnquiryOrderReturn.css";
import BackgroundImage from "./BackgroundImage";
import ic_calendar from "../img/ic_calendar.png";
import { Link } from "react-router-dom";

function ListOfEnquiryOrderReturn(props) {
  const { listName } = props;

  return (
    <div>
      <div className="ListOfEnquiryOrderReturn-main-container">
        <h4>List Of {listName}</h4>

        <hr className="ListOfEnquiryOrderReturn-divider" />

        <div className="ListOfEnquiryOrderReturn-inner-container">
          <h4>Search Options</h4>

          <div className="ListOfEnquiryOrderReturn-radio-container">
            <input
              type="radio"
              name="search-option-method"
              value="reference"
              id="reference-radio-btn"
            />
            <label for="reference-radio-btn">Search By Your Reference</label>
            <input name="reference-input" type="text" />
          </div>
          <div className="ListOfEnquiryOrderReturn-radio-container">
            <input
              type="radio"
              name="search-option-method"
              value="order-number"
              id="order-number-radio-btn"
              disabled={listName == "Enquiry" ? "disabled" : ""}
            />
            <label
              for="order-number-radio-btn"
              className={
                listName == "Enquiry"
                  ? "ListOfEnquiryOrderReturn-label-disabled"
                  : ""
              }
            >
              Search By Order Number
            </label>
            <input
              name="order-number-input"
              type="text"
              disabled={listName == "Enquiry" ? "disabled" : ""}
            />
          </div>
          <div className="ListOfEnquiryOrderReturn-radio-container">
            <input
              type="radio"
              name="search-option-method"
              value="enquiry-number"
              id="enquiry-number-radio-btn"
            />
            <label for="enquiry-number-radio-btn">
              Search By Enquiry Number
            </label>
            <input name="enquiry-number-input" type="text" />
          </div>
          <div className="ListOfEnquiryOrderReturn-radio-container">
            <input
              type="radio"
              name="search-option-method"
              value="date-range"
              id="date-range-radio-btn"
            />
            <label for="date-range-radio-btn">
              Search By Date Range / Status
            </label>
            <span className="ListOfEnquiryOrderReturn-dateInput-label">
              From
            </span>
            <input
              name="date-range-from-input"
              type="text"
              className="ListOfEnquiryOrderReturn-dateInput"
            />
            <img
              src={ic_calendar}
              className="ListOfEnquiryOrderReturn-dateInput-img"
            />
            <span className="ListOfEnquiryOrderReturn-dateInput-label">To</span>
            <input
              name="date-range-to-input"
              type="text"
              className="ListOfEnquiryOrderReturn-dateInput"
            />
            <img
              src={ic_calendar}
              className="ListOfEnquiryOrderReturn-dateInput-img"
            />
          </div>
          <div className="ListOfEnquiryOrderReturn-select-container">
            <label>Status</label>
            <select name="status-selection">
              <option value="0">Select Status</option>
              <option value="1">All</option>
              <option value="2">Being Processed</option>
              <option value="3">Quote Received</option>
            </select>
          </div>

          <div className="ListOfEnquiryOrderReturn-my-order-container">
            <input
              type="checkbox"
              name="my-orders-only"
              id="my-orders-only-id"
            />
            <label for="my-orders-only-id">My Orders Only</label>
          </div>

          <button className="ListOfEnquiryOrderReturn-search-button">
            Search Orders
          </button>
        </div>

        <BackgroundImage />
      </div>
    </div>
  );
}

export default ListOfEnquiryOrderReturn;
