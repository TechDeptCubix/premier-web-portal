import React from "react";
import icDelete from "../img/ic_delete_selected.png";
import icDownloadToEcel from "../img/ic_download_to_excel.png";
import icUploadFromExcel from "../img/ic_upload_from_excel.png";
import part_1 from "../img/part_1.png";
import Header from "./Header";
import Footer from "./Footer";
import "../css/CreateEnquiry.css";
import SupportedItemsPopup from "./SupportedItemsPopup";
import SuccessPopup from "./SuccessPopup";
import BackgroundImage from "./BackgroundImage";

function CreateEnquiry() {
  return (
    <div>
      <div className="CreateEnquiry-main-container">
        <h4>Create Enquiry</h4>
        <hr className="CreateEnquiry-divider" />

        <div className="CreateEnquiry-input-fields-container">
          <label>Your Reference</label>
          <input name="reference" type="text" />
          <label>Enter Your Remarks</label>
          <input name="remarks" type="text" />
        </div>

        <div className="CreateEnquiry-excel-button-container">
          <button>
            <img src={icUploadFromExcel} /> <span>Upload From Excel</span>
          </button>
          <button>
            <img src={icDownloadToEcel} /> <span>Download To Excel</span>
          </button>
          <button>
            <img src={icDelete} /> <span>Delete Selected</span>
          </button>
        </div>

        <table className="CreateEnquiry-table">
          <thead>
            <tr>
              <th>Sl.No.</th>
              <th>Part Number</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>
                Supported <br /> Items
              </th>
              <th>
                Supported Items <br /> From
              </th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{1}</td>
              <td>
                <input type="text" name="partNumber" />
              </td>
              <td>{"description"}</td>
              <td>
                <input type="text" name="quantity" />
              </td>
              <td>
                <button className="CreateEnquiry-supersed-check-button">
                  Check
                </button>
              </td>
              <td>{"supported from"}</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
            <button className="CreateEnquiry-add-another-item-button">
              Add Another Item
            </button>
          </tbody>
        </table>

        <BackgroundImage />
      </div>

      <div className="CreateEnquiry-enquiry-button-container">
        <button className="CreateEnquiry-button">Draft Enquiry</button>{" "}
        <span>Or </span>
        <button className="CreateEnquiry-button">Execute Enquiry</button>
      </div>

      {/* <SupportedItemsPopup /> */}

      {/* <SuccessPopup /> */}
    </div>
  );
}

export default CreateEnquiry;
