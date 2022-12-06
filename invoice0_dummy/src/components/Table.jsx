import { Space, Table, Button, Card, Dropdown } from "antd";
import { ExportOutlined, CaretDownFilled } from "@ant-design/icons";
import { useState } from "react";

export default function TableData({
  onChange,
  filters,
  orderdata,
  totalorders,
  headNavFlag,
  setheadNavFlag,
  selectedInvoices,
  setselectedInvoices,
  selectedRowKeys,
  setSelectedRowKeys,
}) {
  const items = [
    {
      label: "View the invoice",
      key: "1",
    },
    {
      label: "Send the invoice to the customer",
      key: "2",
    },
    {
      label: "Regenrate",
      key: "3",
    },
  ];
  const menuProps = {
    items,
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    if (newSelectedRowKeys.length > 0) {
      setheadNavFlag(true);
      console.log("flag ----------set as true");
      setselectedInvoices(newSelectedRowKeys.length);
    } else {
      setheadNavFlag(false);
      console.log("flag ----------set as false");
    }
    setSelectedRowKeys(newSelectedRowKeys);
  };
  // if (headNavFlag == false) {
  //   setSelectedRowKeys([]);
  //   setselectedInvoices(0);
  // }
  const onchange = (value) => {
    console.log("selected", value);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  console.log(orderdata);
  const columns = [
    {
      title: "Invoice",
      dataIndex: "orderNum",
      key: "orderNum",
      sorter: (a, b, sortOrder) => {
        onChange({
          sortBy: "orderNo",
          OrderBy: sortOrder === "descend" ? "desc" : "asc",
        });
      },
      sortDirections: ["descend", "ascend"],

      render: (_, record) => (
        <Space>
          <a>
            {record.orderNum}
            <span style={{ marginLeft: "1rem" }}>
              <ExportOutlined />
            </span>
          </a>
        </Space>
      ),
    },
    {
      title: "Order",
      dataIndex: "shopifyOrderNum",
      key: "shopifyOrderNum",
      sorter: (a, b, sortOrder) => {
        onChange({
          sortBy: "shopifyOrderNo",
          OrderBy: sortOrder === "descend" ? "desc" : "asc",
        });
      },
      sortDirections: ["descend", "ascend"],
      render: (_, record) => (
        <div style={{ color: "#4D5055" }}>
          {record.shopifyOrderNum === record.orderNum ? (
            <>-</>
          ) : (
            <>{record.shopifyOrderNum}</>
          )}
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      sorter: (a, b, sortOrder) => {
        onChange({
          sortBy: "invoiceDate",
          OrderBy: sortOrder === "descend" ? "desc" : "asc",
        });
      },
      sortDirections: ["descend", "ascend"],
      render: (_, record) => {
        let arr = new Date(record.invoiceDate).toDateString().split(" ");
        arr.splice(0, 1);
        return (
          <>
            <div>{arr[1] + " " + arr[0] + " " + arr[2]}</div>
          </>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "customerName",
      key: "customerName",
      key: "shopifyOrderNum",
      sorter: (a, b, sortOrder) => {
        onChange({
          sortBy: "shopifyOrderNo",
          OrderBy: sortOrder === "descend" ? "desc" : "asc",
        });
      },
      sortDirections: ["descend", "ascend"],
      render: (_, record) => (
        <div style={{ color: "#4D5055" }}>
          {record.customerName ? record.customerName : <>-</>}
        </div>
      ),
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      key: "totalAmount",
      sorter: (a, b, sortOrder) => {
        onChange({
          sortBy: "total",
          OrderBy: sortOrder === "descend" ? "desc" : "asc",
        });
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      sorter: (a, b, sortOrder) => {
        onChange({
          sortBy: "paymentStatus",
          OrderBy: sortOrder === "descend" ? "desc" : "asc",
        });
      },
      sortDirections: ["descend", "ascend"],
      render: (_, record) => (
        <div style={{}}>
          {record.paymentStatus == "pending" ? (
            <Button
              type="primary"
              style={{
                background: "#ffc58b",
                borderRadius: "100px",
                fontSize: "12px",
                color: "#4D5055",
              }}
            >
              {record.paymentStatus}
            </Button>
          ) : (
            <Button
              type="primary"
              style={{
                background: "#c4cdd5",
                borderRadius: "100px",
                fontSize: "12px",
                color: "#4D5055",
              }}
            >
              {record.paymentStatus}
            </Button>
          )}
        </div>
      ),
    },
    {
      title: "Fulfillment",
      dataIndex: "fulfillmentStatus",
      key: "fulfillmentStatus",
      sorter: (a, b, sortOrder) => {
        onChange({
          sortBy: "fulfillmentStatus",
          OrderBy: sortOrder === "descend" ? "desc" : "asc",
        });
      },
      sortDirections: ["descend", "ascend"],
      render: (_, record) => (
        <div style={{}}>
          {record.fulfillmentStatus == "unfulfilled" ? (
            <Button
              type="primary"
              style={{
                background: "#ffea8a",
                borderRadius: "100px",
                fontSize: "12px",
                color: "#4D5055",
              }}
            >
              {record.fulfillmentStatus}
            </Button>
          ) : (
            <Button
              type="primary"
              style={{
                background: "#c4cdd5",
                borderRadius: "100px",
                fontSize: "12px",
                color: "#4D5055",
              }}
            >
              {record.fulfillmentStatus}
            </Button>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b, sortOrder) => {
        onChange({
          sortBy: "status",
          OrderBy: sortOrder === "descend" ? "desc" : "asc",
        });
      },
      sortDirections: ["descend", "ascend"],
      render: (_, record) => (
        <div style={{}}>
          {record.status == "Sent" ? (
            <Button
              type="primary"
              style={{
                background: "#bbe5b3",
                borderRadius: "100px",
                fontSize: "12px",
                color: "#4D5055",
              }}
            >
              {record.status}
            </Button>
          ) : (
            <Button
              type="primary"
              style={{
                background: "#c4cdd5",
                borderRadius: "100px",
                fontSize: "12px",
                color: "#4D5055",
              }}
            >
              {record.status}
            </Button>
          )}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "action",
      render: (_, record) => (
        <>
          {" "}
          <Dropdown
            menu={menuProps}
            style={{
              color: "#00a2ff",
              marginLeft: "1rem",
              alignSelf: "center",
            }}
          >
            {/* <Button
              style={{
                color: "#00a2ff",
                marginLeft: "1rem",
                alignSelf: "center",
              }}
            > */}
            <Space>
              <span style={{ color: "#00a2ff" }}>More</span>
              <CaretDownFilled style={{ color: "#00a2ff" }} />
            </Space>
            {/* </Button> */}
          </Dropdown>
        </>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      {console.log(filters)}
      <Card>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={orderdata}
          showSorterTooltip={false}
          pagination={{
            pageSize: parseInt(filters.limit),
            total: parseInt(totalorders),
            hideOnSinglePage: true,
            onChange: (page) => {
              onChange({ page });
            },
          }}
        ></Table>
      </Card>
    </div>
  );
}
