import React, { useContext } from "react";
import "../css/DeleteItemFromPopup.css";

function DeleteItemFromListPopup(props) {
  const { showHideDeletePopup ,removeItemConfirmed} = props;

  return (
    <div className="DeleteItemFromListPopup-main-background">
      <div className="DeleteItemFromListPopup-container-background">
        <div className="DeleteItemFromListPopup-image-text-container">
          <span></span>
          <p>Are you sure?</p>
        </div>
        <div className="DeleteItemFromListPopup-buttonContainer">
          <button
            className="DeleteItemFromListPopup-go-back-button DeleteItemFromListPopup-cancel-button"
            onClick={() => showHideDeletePopup(false)}
          >
            Cancel
          </button>
          <button className="DeleteItemFromListPopup-go-back-button" onClick={removeItemConfirmed}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteItemFromListPopup;
