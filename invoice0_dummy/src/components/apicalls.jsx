import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaG9wTmFtZSI6InRlY2tpZS1zdXBwbGllcy00Lm15c2hvcGlmeS5jb20ifQ.c20g1P39f2XmfgFg_ZxOlzylhhcnyXvvD3shbdPJVt0";
const newAxios = axios.create({
  //baseURL : "https://invoiceheroapi.mlveda-test.in/"
  baseURL: process.env.REACT_APP_API_URL,
  headers: { Authorization: `Bearer ${token}` },
});

export const getShopData = () => newAxios.get("/api/shop");

export const getOrderCount = () => newAxios.get("/api/order/count");

// export const getOrderData = () =>
//   newAxios.get(
//     "/api/order?searchText=&OrderBy=desc&sortBy=invoiceDate&limit=25&pageNo=1"
//   );

export const getOrderData = ({
  queryKey: [
    ,
    {
      searchText,
      limit,
      sortBy,
      OrderBy,
      page,
      dateFilter: [startDateTmp, endDateTmp] = [],
      mailStatus,
      orderStatus,
      paymentStatus,
      fulfillmentStatus,
    },
  ],
}) => {
  let startDate = null;
  let endDate = null;
  if (startDateTmp) {
    startDate = new Date(startDateTmp.format());
    startDate.setHours(0, 0, 0, 0);
  }
  if (endDateTmp) {
    endDate = new Date(endDateTmp.format());
    endDate.setHours(23, 59, 59, 999);
  }

  return newAxios
    .get("/api/order", {
      params: {
        searchText: searchText || null,
        limit: limit || 25,
        sortBy: sortBy || "invoiceDate",
        OrderBy: OrderBy || "desc",
        pageNo: page || 1,
        startDate: startDate?.toUTCString(),
        endDate: endDate?.toUTCString(),
        mail: mailStatus || null,
        orderStatus: orderStatus || null,
        paymentStatus: paymentStatus || null,
        fulfillmentStatus: fulfillmentStatus || null,
      },
    })
    .then((res) =>
      res.data.orderData.map((order) => ({ ...order, key: order.orderId }))
    );
};

export const mergePdfAction = (ids) => {
  return newAxios.post("/api/order/bulk/print", { ids: ids }).then((res) => {
    return res.data;
  });
};

export const sendInvoiceCust = (ids) => {
  return newAxios
    .post("/api/order/bulk/send", { ids: ids })
    .then(function (response) {
      return response.data;
    });
};

export const sendInvoiceMe = (ids) => {
  return newAxios
    .post("/api/order/bulk", { ids: ids })
    .then(function (response) {
      return response.data;
    });
};

// export const setInvoiceCurrency = (value) => {
//   return newAxios
//     .put("/api/settings", { invoiceSettings: { generateInvoiceOn: value } })
//     .then(function (response) {
//       return response.data;
//     });
// };

export const getSettingsData = () => {
  return newAxios.get("/api/settings").then(function (response) {
    return response.data;
  });
};

export const setSettingsData = (data) => {
  // var data = {};
  // console.log("array in apicall", array);
  // if (array[0] == "tax") {
  //   data = {
  //     companyDetails: { taxNumber: array[1].taxNumber },
  //     invoiceSettings: {
  //       isShowTax: array[1].isShowTax,
  //       isShowIndividualTax: array[1].isShowIndividualTax,
  //       isShowEmptyTaxInSummary: array[1].isShowEmptyTaxInSummary,
  //       isShowCustomerVatNumber: array[1].isShowCustomerVatNumber,
  //       customerVatNumberLabel: array[1].customerVatNumberLabel,
  //     },
  //   };
  // } else if (array[0] == "company") {
  //   data = {
  //     companyDetails: {
  //       address: {
  //         address1: array[1].address1,
  //         address2: array[1].address2,
  //         city: array[1].city,
  //         country: array[1].country,
  //         postcode: array[1].postcode,
  //         state: array[1].state,
  //       },
  //       brandName: array[1].brandName,
  //       email: array[1].email,
  //       legalNameForBusiness: array[1].legalNameForBusiness,
  //       logo: array[1].logo,
  //       phone: array[1].phone,
  //       website: array[1].website,
  //     },
  //   };
  // }
  console.log("data :", data);
  return newAxios.put("/api/settings", data).then(function (response) {
    return response.data;
  });
};
