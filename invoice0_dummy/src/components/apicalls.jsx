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
