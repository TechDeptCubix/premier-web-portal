import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../css/HomePage.css";
import ic_important_notifications from "../img/ic_important_notifications.png";
import ic_offers from "../img/ic_offers.png";
import ic_offer_1 from "../img/ic_offer_1.png";
import ic_offer_2 from "../img/ic_offer_2.png";

function Homepage() {
  return (
    <div>
      <div className="Homepage-main-container">
        <div className="HomePage-left-container">
          <div className="HomePage-left-container-content">
            <h4>Previous Requests</h4>
            <table className="HomePage-table">
              <thead>
                <tr>
                  <th>Enquiry Number</th>
                  <th>Status</th>
                  <th>Reference</th>
                  <th>View</th>
                  <th>Edit</th>
                  <th>Edit</th>
                  <th>Edit</th>
                  <th>Edit</th>
                  <th>Edit</th>
                  <th>Edit</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1001</td>
                  <td>Verification Completed</td>
                  <td></td>
                  <td>View</td>
                  <td>Edit</td>
                  <td></td>
                  <td>View</td>
                  <td>Edit</td>
                  <td>ed</td>
                  <td>wd</td>
                  <td>w</td>
                </tr>
                <tr>
                  <td>1002</td>
                  <td>Order Created</td>
                  <td>124867</td>
                  <td>View</td>
                  <td></td>
                </tr>
                <tr>
                  <td>1003</td>
                  <td>Verification Completed</td>
                  <td></td>
                  <td>View</td>
                  <td>Edit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="HomePage-right-container">
          <div className="HomePage-important-notifications-container">
            <div className="Homepage-important-notifications-container-header">
              <img src={ic_important_notifications} /> Important Notifications
            </div>
            <ul>
              <li>
                Delivery for item “DK-12 ABS SENSORS” will be delayed by 1 day
              </li>
              <li>Requested items J2 SUSPENSION back in stock</li>
            </ul>
          </div>

          <div className="HomePage-offers-container">
            <div className="Homepage-important-notifications-container-header">
              <img src={ic_offers} />
              Offers For You
            </div>
            <ul>
              <li>
                <img src={ic_offer_1} />
                <div className="skew"></div>
                <div className="skewCover"></div>
                <span className="skewText">
                  20% off on compressors dfgsh dr dty dy dt y bdbb bfb
                </span>
              </li>
              <li>
                <img src={ic_offer_2} />
                <div className="skew"></div>
                <div className="skewCover"></div>
                <span className="skewText">
                  Get Disc break at unbelievable prices
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
