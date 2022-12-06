import Dashboard from "./Dashboard";
import { getOrderData } from "./apicalls";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TableData from "./Table";
import { BulbTwoTone } from "@ant-design/icons";
import { getOrderCount } from "./apicalls";
import { Spin } from "antd";

export default function InvoiceBoard() {
  const [filters, setFilters] = useState({
    dateFilter: [null, null],
    limit: 25,
    sortBy: "invoiceDate",
    OrderBy: "desc",
    orderStatus: null,
    paymentStatus: null,
    fulfillmentStatus: null,
    mailStatus: null,
    page: 1,
  });
  const [totalorders, setorderno] = useState(0);
  const [headNavFlag, setheadNavFlag] = useState(false);
  const [selectedInvoices, setselectedInvoices] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { data: orderdata, isFetching } = useQuery(
    ["m", filters],
    getOrderData,
    {
      useErrorBoundary: true,
      suspense: true,
      staleTime: Infinity,
      keepPreviousData: true,
      onSuccess: (orderdata) => {
        // console.log("orderdata", orderdata);
      },
    }
  );
  const { data: countno } = useQuery(["total-count"], getOrderCount, {
    staleTime: Infinity,
    onSuccess: (countno) => {
      console.log("total orders", countno.data["totalInvoices"]);
      setorderno(countno.data["totalInvoices"]);
    },
  });
  function onfilterchange(newfilter) {
    setFilters({ ...filters, ...newfilter });
  }
  return (
    <div>
      <Dashboard
        onChange={onfilterchange}
        filters={filters}
        orderdata={orderdata}
        totalorders={totalorders}
        headNavFlag={headNavFlag}
        setheadNavFlag={setheadNavFlag}
        selectedInvoices={selectedInvoices}
        setselectedInvoices={setselectedInvoices}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <Spin spinning={isFetching}>
        <TableData
          onChange={onfilterchange}
          filters={filters}
          orderdata={orderdata}
          totalorders={totalorders}
          headNavFlag={headNavFlag}
          setheadNavFlag={setheadNavFlag}
          selectedInvoices={selectedInvoices}
          setselectedInvoices={setselectedInvoices}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
        />
      </Spin>
      <div
        style={{
          backgroundColor: "#e1f5fd",
          borderTopColor: "#00a2ff",
          borderTopStyle: "solid",
          marginLeft: "15rem",
          marginRight: "13rem",
          marginTop: "20px",
        }}
      >
        <span>
          <BulbTwoTone style={{ marginRight: "5px" }} />
          <span style={{ color: "GrayText" }}>
            Now you can view/download your invoices from your orders page
            itself. Select particular orders (50 max) or open a particular order
            and choose Invoice Hero features from More actions drop down.
          </span>
        </span>
      </div>
    </div>
  );
}
