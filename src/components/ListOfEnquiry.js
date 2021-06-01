import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../css/ListOfEnquiry.css";
import BackgroundImage from "./BackgroundImage";
import ic_calendar from "../img/ic_calendar.png";

function ListOfEnquiry() {
  return (
    <div>
      <Header />

      <div className="ListOfEnquiry-main-container">
        <h4>List Of Enquiry</h4>

        <hr className="ListOfEnquiry-divider" />

        <div className="ListOfEnquiry-inner-container">
          <h4>Search Options</h4>

          <div className="ListOfEnquiry-radio-container">
            <input
              type="radio"
              name="search-option-method"
              value="reference"
              id="reference-radio-btn"
            />
            <label for="reference-radio-btn">Search By Your Reference</label>
            <input name="reference-input" type="text" />
          </div>
          <div className="ListOfEnquiry-radio-container">
            <input
              type="radio"
              name="search-option-method"
              value="order-number"
              id="order-number-radio-btn"
            />
            <label for="order-number-radio-btn">Search By Order Number</label>
            <input name="order-number-input" type="text" />
          </div>
          <div className="ListOfEnquiry-radio-container">
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
          <div className="ListOfEnquiry-radio-container">
            <input
              type="radio"
              name="search-option-method"
              value="date-range"
              id="date-range-radio-btn"
            />
            <label for="date-range-radio-btn">
              Search By Date Range / Status
            </label>
            <span className="ListOfEnquiry-dateInput-label">From</span>
            <input
              name="date-range-from-input"
              type="text"
              className="ListOfEnquiry-dateInput"
            />
            <img src={ic_calendar} className="ListOfEnquiry-dateInput-img" />
            <span className="ListOfEnquiry-dateInput-label">To</span>
            <input
              name="date-range-to-input"
              type="text"
              className="ListOfEnquiry-dateInput"
            />
            <img src={ic_calendar} className="ListOfEnquiry-dateInput-img" />
          </div>
          <div className="ListOfEnquiry-select-container">
            <label>Status</label>
            <select name="status-selection">
              <option value="0">Select Status</option>
              <option value="1">All</option>
              <option value="2">Being Processed</option>
              <option value="3">Quote Received</option>
            </select>
          </div>

          <div className="ListOfEnquiry-my-order-container">
            <input
              type="checkbox"
              name="my-orders-only"
              id="my-orders-only-id"
            />
            <label for="my-orders-only-id">My Orders Only</label>
          </div>

          <button className="ListOfEnquiry-search-button">Search Orders</button>
        </div>

        <BackgroundImage />
      </div>

      <div className="ListOfEnquiry-table-container">
        <table className="ListOfEnquiry-table">
          <thead>
            <tr>
              <th>Ref.No.</th>
              <th>Order No.</th>
              <th>Created by</th>
              <th>Created On</th>
              <th>Order Status</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{1}</td>
              <td>{1960}</td>
              <td>{"hameed"}</td>
              <td>{"11 May 2021 13:05: 45"}</td>
              <td>{"Being processed"}</td>
              <td>
                <a href="">View Enquiry</a>
              </td>
            </tr>
            <tr>
              <td>{2}</td>
              <td>{667}</td>
              <td>{"Ajaz"}</td>
              <td>{"12 May 2021 13:05: 45"}</td>
              <td>{"Quote Received"}</td>
              <td>
                <a href="">Place Order</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default ListOfEnquiry;
