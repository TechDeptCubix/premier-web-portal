import { useEffect } from "react";
import SearchResultContainer from "./SearchResultContainer";

function CreateEnquiryTableRow(props) {
  let {
    rowValues,
    showHideSupportedItemsPopup,
    handleInputFromRow,
    handleCheckbox,
    isUserSearching,
    currentCodeInputBox,
    handleKeyboardArrowDown,
    handleQtykeyDown,
    saveSearchListRef,
    handleListItemClick,
    checkWhetherValidCode,
    isValidCodeState,
    isDollarSearchEnabled,
  } = props;

  useEffect(() => {
    console.log("row component mounted rowValues ", JSON.stringify(rowValues));
  }, []);

  return (
    <tr>
      {console.log("rowValues from CreateEnquiry is ", rowValues)}
      {console.log("boolean status  of search drop down", isUserSearching)}
      <td>{rowValues.id}</td>
      <td
        className={
          isUserSearching && rowValues.id == currentCodeInputBox
            ? "CreateEnquiry-parent-container-row-of-search-list"
            : ""
        }
      >
        <div className="CreateEnquiry-container-div-input-code">
          <input
            id={rowValues.id}
            type="text"
            name="code"
            autoComplete="off"
            value={rowValues.code}
            onChange={handleInputFromRow}
            onKeyDown={handleKeyboardArrowDown}
            onBlur={checkWhetherValidCode}
          />
          {isUserSearching && rowValues.id == currentCodeInputBox && (
            <SearchResultContainer
              style={{ position: "relative", zIndex: "2" }}
              typingCharacter={rowValues.code}
              handleListItemClick={handleListItemClick}
              saveSearchListRef={saveSearchListRef}
              isValidCodeState={isValidCodeState}
              isDollarSearchEnabled={isDollarSearchEnabled}
            />
          )}
        </div>
      </td>
      <td>{rowValues.description}</td>
      <td>
        <input
          id={rowValues.id}
          min="1"
          type="number"
          name="qty"
          autoComplete="off"
          value={rowValues.qty}
          onChange={handleInputFromRow}
          onKeyDown={handleQtykeyDown}
          className="CreateEnquiry-quantity-input-box"
        />
      </td>
      <td>
        {rowValues.supported_items ? (
          <button
            className="CreateEnquiry-supersed-check-button"
            onClick={showHideSupportedItemsPopup}
          >
            Check
          </button>
        ) : (
          ""
        )}
      </td>
      <td>{rowValues.supported_items_from}</td>
      <td>
        <input
          id={rowValues.id}
          type="checkbox"
          onChange={handleCheckbox}
          checked={rowValues.select_check_box ? "checked" : ""}
        />
      </td>
    </tr>
  );
}

export default CreateEnquiryTableRow;
