import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

function EnquiryListTable() {
  const [isSending, setIsSending] = useState(false);
  const [listOfEnquiry, setListOfEnquiry] = useState([]);
  const [stateCompanyCode, setCompanyCode] = useState("");
  const getListOfEnquiries = () => {
    setIsSending(true);

    let current_company_local = localStorage.getItem("current_company");
    let currentCompany;
    if (current_company_local) {
      currentCompany = JSON.parse(localStorage.getItem("current_company"));

      console.log("Home page company value is  ", currentCompany);

      setCompanyCode(currentCompany.company_code);
    }

    const apiUrl = `https://api-eproc.premierauto.ae/api/EnquiryList/${currentCompany.company_code}`;

    console.log("api url ", apiUrl);

    axios
      .get(apiUrl)
      .then((res) => {
        setIsSending(false);
        console.log("Enquiry Table response ", res.data);
        setListOfEnquiry(res.data);
      })
      .catch((e) => {
        console.log("the error in Homepage api call " + e);
        setIsSending(false);
      });
  };

  useEffect(() => {
    console.log("HomePage Machine component >>>>>>> MOunted ");

    getListOfEnquiries();

    return function cleanup() {
      console.log("HomePage Machine component <<<<<<< unmounted ");
    };
  }, []);

  return (
    <div className="HomePage-ulContainer">
      {isSending ? (
        <LoadingScreen />
      ) : (
        <table className="HomePage-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Enquiry Number</th>
              <th>Status</th>
              <th>Reference</th>
              <th>View</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {listOfEnquiry.map((singleItem, index) => {
              return (
                <tr
                  key={index}
                  className={
                    singleItem.type === "Draft"
                      ? "HomePage-draft-row-bg"
                      : "HomePage-accepted-row-bg"
                  }
                >
                  <td>{singleItem.type}</td>
                  <td>{singleItem.enquiry_number}</td>
                  <td>{singleItem.status}</td>
                  <td>{singleItem.reference}</td>
                  <td>
                    {" "}

                    {/* change viewpath based on */}
                    {
                    (singleItem.status == "Quotation Generated" || singleItem.status == "Order Confirmed") ?
                    <Link
                      to={
                        {
                          pathname: "/viewEnquiryAfterQuotationGeneration",
                          state: {
                            enquiryNumber: singleItem.enquiry_number,
                            companyCodeForView: stateCompanyCode,
                            quotationNumber: singleItem.qoutNo,
                            status: singleItem.status
                          },
                        }
                      }
                    >
                      View
                    </Link>
                    :
                    <Link
                      to={
                        singleItem.type === "Draft"
                          ? {
                              pathname: "/viewDraft",
                              state: {
                                enquiryNumber: singleItem.enquiry_number,
                                companyCodeForView: stateCompanyCode,
                              },
                            }
                          : {
                              pathname: "/viewEnquiry",
                              state: {
                                enquiryNumber: singleItem.enquiry_number,
                                companyCodeForView: stateCompanyCode,
                              },
                            }
                      }
                    >
                      View
                    </Link>
            }


                    {/* svfsv */}
                  </td>
                  <td>
                    {singleItem.type === "Draft" ? (
                      <Link
                        to={{
                          pathname: "/createEnquiry",
                          state: singleItem,
                        }}
                      >
                        Edit
                      </Link>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default EnquiryListTable;
