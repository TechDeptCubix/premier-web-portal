import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../css/ViewEnquiry.css";
import BackgroundImage from "./BackgroundImage";
import ic_calendar from "../img/ic_calendar.png";
import icDownloadToExcel from "../img/ic_download_to_excel.png";

function ViewEnquiry() {
  return (
    <div>
      <Header />

      <div className="ViewEnquiry-main-container">
        <h4>View Enquiry</h4>

        <hr className="ViewEnquiry-divider" />

        <div className="ViewEnquiry-inner-container">
          <div className="ViewEnquiry-left-container">
            <div className="ViewEnquiry-label-value-container">
              <label>Order No.</label>
              <span className="ViewEnquiry-label-value-colon">:</span>
              <span className="ViewEnquiry-label-value">1960</span>
            </div>
            <div className="ViewEnquiry-label-value-container">
              <label>Reference</label>
              <span className="ViewEnquiry-label-value-colon">:</span>
              <span className="ViewEnquiry-label-value">By Ajas</span>
            </div>
            <div className="ViewEnquiry-label-value-container">
              <label>Your Remarks</label>
              <span className="ViewEnquiry-label-value-colon">:</span>
              <span className="ViewEnquiry-label-value">
                Urgent Requirement
              </span>
            </div>
          </div>

          <div className="ViewEnquiry-right-container">
            <div className="ViewEnquiry-label-value-container">
              <label>Date & Time</label>
              <span className="ViewEnquiry-label-value-colon">:</span>
              <span className="ViewEnquiry-label-value">
                11/05/2021 9:05:45
              </span>
            </div>
          </div>
        </div>

        <div className="ViewEnquiry-excel-button-container">
          <button className="ViewEnquiry-excel-button">
            <img src={icDownloadToExcel} /> <span>Download To Excel</span>
          </button>
        </div>

        <table className="ViewEnquiry-table">
          <thead>
            <tr>
              <th>Sl.No.</th>
              <th>Part Number</th>
              <th>Description</th>
              <th>Qty Req</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{1}</td>
              <td>{1632}</td>
              <td>{"HIGH SENSE ABS SENSORS"}</td>
              <td>{"20"}</td>
            </tr>
            <tr>
              <td>{2}</td>
              <td>{"PQP0612552"}</td>
              <td>{"Ultra Break pad"}</td>
              <td>{"10"}</td>
            </tr>
          </tbody>
        </table>
        <BackgroundImage />
      </div>

      <Footer />
    </div>
  );
}

export default ViewEnquiry;
