import React, { useEffect, useState } from "react";
import "../css/ViewEnquiryAfterQuotationGeneration.css";
import BackgroundImage from "./BackgroundImage";
import icDownloadToExcel from "../img/ic_download_to_excel.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SuccessPopup from "./SuccessPopup";
import ic_remove_entry from "../img/ic_remove_entry.png";
import DeleteItemFromListPopup from "./DeleteItemFromListPopup";

function ViewEnquiryAfterQuotationGeneration() {
  const [currentItemForDeletion, setCurrentItemForDeletion] = useState(null);
  const location = useLocation();
  const dataFromEnquiry = location.state;
  const [initialViewValues, setInitialViewValues] = useState({
    reference: "",
    remarks: "",
    dateTime: "",
    orderNo: "",
  });

  const [initialViewValuesOfTable, setInitialViewValuesOfTable] = useState({
    
    table_row_values: [],
  })


  useEffect(() => {
    const apiUrl = `https://api-eproc.premierauto.ae/api/Enquiry/${dataFromEnquiry.enquiryNumber}/${dataFromEnquiry.companyCodeForView}`;
    axios
      .get(apiUrl)
      .then((res) => {
        
        console.log(" order status is ", dataFromEnquiry.status);
        setInitialViewValues({
          ...initialViewValues,
          reference: res.data[0].ord_H_ref,
          remarks: res.data[0].ord_H_remarks,
          dateTime: res.data[0].ord_H_datetime,
          orderNo: res.data[0].ord_H_no
        });
      })
      .catch((e) => {
        console.log("ViewEnquiryAfterQuotationGeneration API response error ", e);
      });
  }, []);

  useEffect(() => {
    const apiUrlGetQuotation = `https://api-eproc.premierauto.ae/api/PremierQuotation/${dataFromEnquiry.quotationNumber}`;
    
    axios
      .get(apiUrlGetQuotation)
      .then((res) => {
        //console.log("ViewEnquiryAfterQuotationGeneration API response success ", res.data);
        setInitialViewValuesOfTable({
          ...initialViewValuesOfTable,
          table_row_values: res.data,
        });
      })
      .catch((e) => {
        console.log("ViewEnquiryAfterQuotationGeneration API response error ", e);
      });
  }, []);

  const sendOrder = ()=>{
   
   let updatedRowsToSend=  initialViewValuesOfTable.table_row_values.map((item)=>{
        let newRow = {
            quotation_number:dataFromEnquiry.quotationNumber,
            so_icode:item.so_icode,
            so_qty:item.so_qty,
            so_uid:item.soUid,
        }
        return newRow;
    })

    console.log("updatedRowsToSend", updatedRowsToSend);
    console.log("stringified updatedRowsToSend", JSON.stringify(updatedRowsToSend));

     axios
    .put(`https://api-eproc.premierauto.ae/api/PremierQuotation/QtnUpdate`, updatedRowsToSend)
    .then((res) => {
      //console.log("Send order API response success ", res);
      showHideSuccessPopup("Order Sent");
    })
    .catch((e) => {
      console.log("Send order API response error ", e);
    });
  };
  
  const [popupTextState, setPopupTextState] = useState("");
  const [showSuccessComponent, setshowSuccessComponent] = useState(false);
  const showHideSuccessPopup = (textForPopup) => {
    setPopupTextState(textForPopup);
    setshowSuccessComponent(!showSuccessComponent);
  };

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const showHideDeletePopup = ()=>{
    setShowDeletePopup(!showDeletePopup);

      // remove e of previously selected item 
     // setCurrentItemForDeletion(null);
  }

  const handleInput = (e)=>{

    console.log("e.target is ", e.target);
    console.log("currnt array is ", initialViewValuesOfTable.table_row_values);

    let updatedTableRow = initialViewValuesOfTable.table_row_values.map((item,index)=>{
        if(index == e.target.id){

            console.log("inside item.id == e.target.id ");
            let qtyValue = 1;

            if (isNaN(parseInt(e.target.value, 10))) {
              //console.log("entered thing isNaN");
              qtyValue = 1;
            } else {
              //console.log("entered thing not isNaN");
              qtyValue = parseInt(e.target.value, 10);
            }
            return {
                ...item,
                [e.target.name]: qtyValue
              };
        }else{
            return item;
        }   
    })

    setInitialViewValuesOfTable({...initialViewValuesOfTable, table_row_values: updatedTableRow})
  }

  const removeItemFromUI = (e)=>{

    setCurrentItemForDeletion(e);

    // now show popup 
    // if return value is false setCurrentItemForDeletion to null if true
    // pass e to removeItemConfirmed 

    console.log("e.target in remove button is and id is ", e.target,e.target.id);

    showHideDeletePopup();
   
  }

  const removeItemConfirmed =()=>{

    console.log("inside removeItemConfirmed");

    if(currentItemForDeletion !== null){

    let e = currentItemForDeletion
    let updatedTableRow = initialViewValuesOfTable.table_row_values.map((item,index)=>{

      if(index == e.target.id){

          console.log("inside item.id == e.target.id ");
          let qtyValue = 0; // set 0 as quantity and hie item from webpage
          return {
              ...item,
              so_qty: qtyValue
            };
            }else{
                return item;
            }   
        })

      setInitialViewValuesOfTable({...initialViewValuesOfTable, table_row_values: updatedTableRow})

      // remove e of previously selected item 
      setCurrentItemForDeletion(null);

      showHideDeletePopup();
    
    }else{
      console.log("else of  if(currentItemForDeletion !== null)");
    }

  }
  return (
    <div>
        {/* <div>{initialViewValuesOfTable.table_row_values.map((item)=>{console.log("single item " ,item)})}</div> */}
      <div className="ViewEnquiryAfterQuotationGeneration-main-container">
        <div className="ViewEnquiryAfterQuotationGeneration-head-cta">

        {dataFromEnquiry.status != "Order Confirmed" ?
            <div className="mt-3 d-flex">
              <h4>View Enquiry After Quotation Generation</h4>
              <span>
                  <button className="ViewEnquiryAfterQuotationGeneration-head-cta-button"onClick={sendOrder}>Send Order</button>
              </span>
            </div>
            :
            <div className="mt-3">
              <h4>Order Confirmed</h4>
            
            </div>
          }
        </div>


        <hr className="ViewEnquiryAfterQuotationGeneration-divider" />

        <div className="ViewEnquiryAfterQuotationGeneration-inner-container">
          <div className="ViewEnquiryAfterQuotationGeneration-left-container">
            <div className="ViewEnquiryAfterQuotationGeneration-label-value-container">
              <label>Order No.</label>
              <span className="ViewEnquiryAfterQuotationGeneration-label-value-colon">:</span>
              <span className="ViewEnquiryAfterQuotationGeneration-label-value">
                {initialViewValues.orderNo}
              </span>
            </div>

            <div className="ViewEnquiryAfterQuotationGeneration-label-value-container">
              <label>Quotation No.</label>
              <span className="ViewEnquiryAfterQuotationGeneration-label-value-colon">:</span>
              <span className="ViewEnquiryAfterQuotationGeneration-label-value">
                {dataFromEnquiry.quotationNumber}
              </span>
              
            </div>

            <div className="ViewEnquiryAfterQuotationGeneration-label-value-container">
              <label>Reference</label>
              <span className="ViewEnquiryAfterQuotationGeneration-label-value-colon">:</span>
              <span className="ViewEnquiryAfterQuotationGeneration-label-value">
                {initialViewValues.reference}
              </span>
            </div>
            <div className="ViewEnquiryAfterQuotationGeneration-label-value-container">
              <label>Your Remarks</label>
              <span className="ViewEnquiryAfterQuotationGeneration-label-value-colon">:</span>
              <span className="ViewEnquiryAfterQuotationGeneration-label-value">
                {initialViewValues.remarks}
              </span>
            </div>
          </div>

          <div className="ViewEnquiryAfterQuotationGeneration-right-container">
            <div className="ViewEnquiryAfterQuotationGeneration-label-value-container">
              <label>Date &amp; Time</label>
              <span className="ViewEnquiryAfterQuotationGeneration-label-value-colon">:</span>
              <span className="ViewEnquiryAfterQuotationGeneration-label-value">
                {
                   
                new Date(initialViewValues.dateTime).getDate() + "/" + (new Date(initialViewValues.dateTime).getMonth() + 1)  +  "/" + new Date(initialViewValues.dateTime).getFullYear() + "  " + new Date(initialViewValues.dateTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
                }
            </span>
            </div>
          </div>
        </div>

        <div className="ViewEnquiryAfterQuotationGeneration-excel-button-container">
          <button className="ViewEnquiryAfterQuotationGeneration-excel-button">
            <img src={icDownloadToExcel} alt="placeholder" />{" "}
            <span>Download To Excel</span>
          </button>
        </div>

        <table className="ViewEnquiryAfterQuotationGeneration-table">
          <thead>
            <tr>
              <th>Sl.No.</th>
              <th>Part Number</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
              {dataFromEnquiry.status != "Order Confirmed" ?<th>Actions</th> : null }
              
            </tr>
          </thead>
          <tbody>
            {initialViewValuesOfTable.table_row_values.map((item, index) => {

              if(item.so_qty != 0){
                return (
                  <tr key={index} id={index}>
                    {/* {console.log(" enquiry item ", item)} */}
                    <td>{index + 1}</td>
                    <td>{item.so_icode}</td>
                    <td>{item.idesc}</td>

                      {dataFromEnquiry.status != "Order Confirmed" ?
                      <td><input className="ViewEnquiryAfterQuotation_qty" name="so_qty" type="number" min="1" value={item.so_qty}id={index} onChange={(e) =>handleInput(e)} />  </td>
                      :
                      <td>{item.tr_qty2}</td>
                      }

                    <td>{item.so_fccost}</td>

                      {dataFromEnquiry.status != "Order Confirmed" ?
                      <td>{item.so_qty * item.so_fccost}</td>
                      :
                      <td>{item.tr_qty2 * item.so_fccost}</td>
                      }
                    
                    {dataFromEnquiry.status != "Order Confirmed" ?
                    <td>
                      <div className="ViewEnquiryAfterQuotation_img_remove_container" onClick={(e)=>removeItemFromUI(e)} id={index}>
                        <img id={index} src={ic_remove_entry} className="ViewEnquiryAfterQuotation_img_remove"/><label id={index}>Delete</label>
                        </div>
                    </td>
                      :
                      null
                    }
                  </tr>
                );
              }
              
            })}
          </tbody>
        </table>
        <div className="ViewEnquiryAfterQuotation_total_container">
            <div>
                <span className="ViewEnquiryAfterQuotation_total_container_sub_total">Total</span>

              {dataFromEnquiry.status != "Order Confirmed" ?
                <label className="ViewEnquiryAfterQuotation_total_container_sub_total_label">{
                    initialViewValuesOfTable.table_row_values.reduce((accumulator,currentValue)=>{
                        if(currentValue.so_qty != 0){
                            return accumulator + (currentValue.so_qty * currentValue.so_fccost)
                        }else{
                            return accumulator + 0;
                        }
                    },0)
                    }</label>
                    :
                    <label className="ViewEnquiryAfterQuotation_total_container_sub_total_label">{
                      initialViewValuesOfTable.table_row_values.reduce((accumulator,currentValue)=>{
                          if(currentValue.tr_qty2 != 0){
                              return accumulator + (currentValue.tr_qty2 * currentValue.so_fccost)
                          }else{
                              return accumulator + 0;
                          }
                      },0)
                      }</label>
              }
            </div>
            <div>
                <span className="ViewEnquiryAfterQuotation_total_container_vat_label"> VAT</span>
                <span className="ViewEnquiryAfterQuotation_total_container_vat_value"> 5%</span>
            </div>
            <div>
                <span className="ViewEnquiryAfterQuotation_total_container_sub_total">Total (including VAT)</span>

              {dataFromEnquiry.status != "Order Confirmed" ?
                <label className="ViewEnquiryAfterQuotation_total_container_sub_total_label">{
                    (initialViewValuesOfTable.table_row_values.reduce((accumulator,currentValue)=>{
                        if(currentValue.so_qty != 0){
                            return accumulator + (currentValue.so_qty * currentValue.so_fccost)
                        }else{
                            return accumulator + 0;
                        }
                    },0)) 
                    + 

                    (initialViewValuesOfTable.table_row_values.reduce((accumulator,currentValue)=>{
                        if(currentValue.so_qty != 0){
                            return accumulator + (currentValue.so_qty * currentValue.so_fccost)
                        }else{
                            return accumulator + 0;
                        }
                    },0) * 0.05)

                    }</label>

                    :

                    <label className="ViewEnquiryAfterQuotation_total_container_sub_total_label">{
                      (initialViewValuesOfTable.table_row_values.reduce((accumulator,currentValue)=>{
                          if(currentValue.tr_qty2 != 0){
                              return accumulator + (currentValue.tr_qty2 * currentValue.so_fccost)
                          }else{
                              return accumulator + 0;
                          }
                      },0)) 
                      + 
  
                      (initialViewValuesOfTable.table_row_values.reduce((accumulator,currentValue)=>{
                          if(currentValue.tr_qty2 != 0){
                              return accumulator + (currentValue.tr_qty2 * currentValue.so_fccost)
                          }else{
                              return accumulator + 0;
                          }
                      },0) * 0.05)
  
                      }</label>

                  }
            </div>
            
        </div>
        <BackgroundImage />
      </div>

      {showSuccessComponent && (
        <SuccessPopup
          showHideSuccessPopup={showHideSuccessPopup}
          popupDetail={popupTextState}
        />
      )}

      {showDeletePopup && (
        <DeleteItemFromListPopup 
        showHideDeletePopup={showHideDeletePopup} 
        removeItemConfirmed={removeItemConfirmed}
        />
        )
      }
    </div>
  );
}

export default ViewEnquiryAfterQuotationGeneration;
