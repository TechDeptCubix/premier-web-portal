import React, { useEffect, useState } from "react";
import "../css/HomePage.css";
import ic_important_notifications from "../img/ic_important_notifications.png";
import ic_offers from "../img/ic_offers.png";
import ic_offer_1 from "../img/ic_offer_1.png";
import EnquiryListTable from "./EnquiryListTable";
import axios from "axios";
import ic_waiting_for_approval from "../img/ic_waiting_for_approval.png";
import ic_order_confirmed from "../img/ic_order_confirmed.png";
import ic_quotation_generated from "../img/ic_quotation_generated.png";
import ic_total_files from "../img/ic_total_files.png";

const Homepage = () => {

  const [orderStatusCount, setOrderStatusCount] = useState([]);

  const [orderStatusCountObject, setOrderStatusCountObject] = useState({
    waiting_for_accept: 0,
    order_confirmed: 0,
    quotation_generated: 0,
    sum:0
  });

  //get company
  let current_company = localStorage.getItem("current_company");
  let currentCompany;
  if (current_company) {
    currentCompany = JSON.parse(current_company);
  }
  const [importantNotifications, setImportantNotifications] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    // get important notifcations
    const apiUrlImportantNotification = `https://api-eproc.premierauto.ae/api/feeds/messages/${currentCompany.company_code}`;
    axios
      .get(apiUrlImportantNotification)
      .then((res) => {
        if (res.data) {
          console.log("important notifications is", res.data);
          setImportantNotifications(res.data);
        }
      })
      .catch((e) => {
        //console.log("something went wrong");
      });

    // get offers
    const apiUrlOffers = `https://api-eproc.premierauto.ae/api/feeds/offers/${currentCompany.company_code}`;
    axios
      .get(apiUrlOffers)
      .then((res) => {
        console.log("offers is  ", res.data);
        setOffers(res.data);
      })
      .catch((e) => {
        //console.log("something went wrong");
      });
  }, []);

  const getHeaderData = () => {
    // get company code from local storage , then call API using that code

    let current_company_local = localStorage.getItem("current_company");
    let currentCompany;
    if (current_company_local) {
      currentCompany = JSON.parse(current_company_local);

      console.log("Home page company value is  ", currentCompany);

      // get order status count
      const apiUrlOrderStatusCount = `https://api-eproc.premierauto.ae/api/orderstatuscount/${currentCompany.company_code}`;
      axios
        .get(apiUrlOrderStatusCount)
        .then((res) => {
          console.log("order and status count is  ", res.data);
          setOrderStatusCount(res.data);
        })
        .catch((e) => {
          //console.log("something went wrong");
        });
    }
  };

  useEffect(() => {
    console.log("Order status count array change useEffect ", orderStatusCount);

    if (orderStatusCount.length > 0) {
      orderStatusCount.map((item) => {
        if (item.status == "Waiting For Accept") {
          setOrderStatusCountObject((prev) => ({
            ...prev,
            waiting_for_accept: item.nos,
          }));
        }
        if (item.status == "Order Confirmed") {
          setOrderStatusCountObject((prev) => ({
            ...prev,
            order_confirmed: item.nos,
          }));
        }

        if (item.status == "Quotation Generated") {
          setOrderStatusCountObject((prev) => ({
            ...prev,
            quotation_generated: item.nos,
          }));
        }

        if (item.status == "SUM") {
          setOrderStatusCountObject((prev) => ({
            ...prev,
            sum: item.nos,
          }));
        }
      });
    } else {
      console.log("Header stat count length else ");
    }
  }, [orderStatusCount]);

  useEffect(() => {
   
      getHeaderData();
    
  }, []);

  const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
    color: "#ffffff"
  };

  return (
    <div>
      <div className="Homepage-main-container">
        <div className="HomePage-left-container">
          <div className="Header-statistics-container ps-2 pe-2">

            <div className="Homepage-label-andimage-outer-container card-firstcolor">
              <div className="Homepage-statistics-card-image-container"><img src={ic_total_files}/></div>
              <div className="card Homepage-statistics-card-image-container-parent card-firstcolor">
                <label>Total</label><span>{orderStatusCountObject.sum}</span>
              </div>
            </div>

            <div className="Homepage-label-andimage-outer-container card-secondcolor">
              <div className="Homepage-statistics-card-image-container"><img src={ic_waiting_for_approval}/></div>
              <div className="card Homepage-statistics-card-image-container-parent card-secondcolor">
                <label>Waiting For Accept</label><span>{orderStatusCountObject.waiting_for_accept}</span>
              </div>
            </div>

            <div  className="Homepage-label-andimage-outer-container card-thirdcolor">
              <div className="Homepage-statistics-card-image-container"><img src={ic_quotation_generated}/></div>
              <div className="card Homepage-statistics-card-image-container-parent card-thirdcolor">
                <label>Quotation Generated</label><span>{orderStatusCountObject.quotation_generated}</span>
              </div>
            </div>

            <div className="Homepage-label-andimage-outer-container card-fourthcolor">
              <div className="Homepage-statistics-card-image-container"><img src={ic_order_confirmed}/></div>
              <div className="card Homepage-statistics-card-image-container-parent card-fourthcolor">
                <label>Order Confirmed</label><span>{orderStatusCountObject.order_confirmed}</span>
              </div>
            </div>

          </div>


          <div className="HomePage-left-container-content">
            <h4>Previous Requests</h4>

            <EnquiryListTable />
          </div>
        </div>

        <div className="HomePage-right-container">
          <div className="HomePage-important-notifications-container">
            <div className="Homepage-important-notifications-container-header">
              <img
                src={ic_important_notifications}
                alt="important notifications"
              />{" "}
              Important Notifications
            </div>
            <div className="HomePage-ulContainer">
              <ul>
                {importantNotifications.length > 0 ? (
                  importantNotifications.map((item, index) => {
                    return <li key={index}>{item.message}</li>;
                  })
                ) : (
                  <li>No notifications.</li>
                )}
              </ul>
            </div>
          </div>

          <div className="HomePage-offers-container">
            <div className="Homepage-important-notifications-container-header">
              <img src={ic_offers} alt="offers" />
              Offers For You
            </div>
            <div className="HomePage-ulContainer">
              <ul>
                {offers.length > 0 ? (
                  offers.map((item, index) => {
                    return (
                      <li key={index}>
                        <div >
                          <span>{item.message}</span>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <li className="no-offers-text">No offers available.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
