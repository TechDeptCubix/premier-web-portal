export default function useDownloadToExcel () {
    

const downloadToExcel = (pageValues,dataFromEnquiry) => {
  let xlsx = require("json-as-xlsx");
  //get username
  let current_user = localStorage.getItem("currentSatusLogUser");
  let currentUser;
  if (current_user) {
    currentUser = JSON.parse(current_user);

    console.log("current_machineguid value is  ", currentUser);
  }
  
  //import the function you want to use
  const { format } = require("date-fns");
  //today's date
  const today = format(new Date(), "dd-MMM-yyyy");

    let uniqueKeyForEnquiry =
      currentUser.user + "-" + format(new Date(), "dd-MMM-yyyy-HH-mm-ss");

    console.log("before download to excel values", pageValues.table_row_values);
    let referenceForEnquiry = pageValues.reference;
    let remarksForEnquiry = pageValues.remarks;
    let postArrayForDownloadToExcel = pageValues.table_row_values.
    filter((item)=>item.is_valid_item)
      .filter((item) => !(item.code.trim() === "") && item.qty > 0)
      .map((item, index) => {
        return {
          sl_no: index + 1,
          ord_Id: dataFromEnquiry
            ? dataFromEnquiry.enquiry_number
            : uniqueKeyForEnquiry,
          ord_date: dataFromEnquiry ? dataFromEnquiry.date : today,
          ord_ref: referenceForEnquiry,
          ord_rem: remarksForEnquiry,
          code: item.code,
          description: item.description,
          qty: parseInt(item.qty, 10), // qty: parseInt(item.qty, 10),  10: This is the base number used in mathematical systems. For our use, it should always be 10.
          unit_price: item.unit_price,
          item_amount: item.item_amount,
          account: "",
          c1: currentUser.user,
          c2: "",
          c3: "",
          c4: dataFromEnquiry ? "MODIFY" : "NEW",
          n1: 0,
          n2: 0,
          n3: 0,
          d1: "",
          d2: "",
        };
      });

    if (!postArrayForDownloadToExcel.length > 0) {
      postArrayForDownloadToExcel = [
        {
          sl_no: 1,
          ord_Id: "",
          ord_date: "",
          ord_ref: "",
          ord_rem: "",
          code: "",
          description: "",
          qty: 0, // qty: parseInt(item.qty, 10),  10: This is the base number used in mathematical systems. For our use, it should always be 10.
          unit_price: 0,
          item_amount: 0,
        },
      ];
    }

    let data = [
      {
        sheet: "Create Enquiry",
        columns: [
          // eg "user" in column should be same as user in content else that column will be blank
          { label: "Sl. No.", value: "sl_no" }, // Top level data // value : "user" should be same as content key double quotes required
          { label: "Part Number", value: "code" }, // Run functions
          { label: "Description", value: "description" },
          { label: "Quantity", value: "qty" }, // Deep props
        ],
        content: postArrayForDownloadToExcel,
      },
    ];

    let settings = {
      fileName: uniqueKeyForEnquiry, // Name of the spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
    };

    xlsx(data, settings); // Will download the excel file

    
 
  };

  return [true, downloadToExcel];
  
}
