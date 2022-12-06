import Navigator from "./Navigation";
import {
  Button,
  Space,
  Dropdown,
  Input,
  DatePicker,
  Drawer,
  Menu,
  Select,
  Divider,
} from "antd";
import {
  SearchOutlined,
  DoubleRightOutlined,
  CaretDownFilled,
  BulbTwoTone,
} from "@ant-design/icons";
import { getShopData } from "./apicalls";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TableData from "./Table";
import ConditionalNavigator from "./ConditionalNavbar";

export default function Dashboard({
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
  console.log("flag------------", headNavFlag);
  const [sortBy, setsortBy] = useState("invoiceDate");
  const [OrderBy, setOrderBy] = useState("asc");
  const [pageNo, setpageNo] = useState(1);
  const [open, setOpen] = useState(false);

  const { Option } = Select;
  const clearAll = () => {
    console.log("filter are :", filters);
    (filters.dateFilter = [null, null]),
      (filters.limit = 25),
      (filters.sortBy = "invoiceDate"),
      (filters.OrderBy = "desc"),
      (filters.orderStatus = null),
      (filters.paymentStatus = null),
      (filters.fulfillmentStatus = null),
      (filters.mailStatus = null),
      console.log("filter are :", filters);
    searchInvoiceData();
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSearch = (e) => {
    console.log("search:", e.target.value);
    onChange({ searchText: e.target.value });
  };
  const changeLimit = (value) => {
    console.log("limit:", value);
    onChange({ limit: parseInt(value) });
  };
  const changeDate = (value) => {
    onChange({ dateFilter: value || [] });
  };
  const handlePayment = (value) => {
    console.log("selected", value);
    onChange({ paymentStatus: value });
  };
  const handleFulfilment = (value) => {
    console.log("selected", value);
    onChange({ fulfillmentStatus: value });
  };
  const onChangeMailStatus = (value) => {
    console.log("selected", value);
    onChange({ mailStatus: value });
  };
  const onChangeOrderStatus = (value) => {
    console.log("selected", value);
    onChange({ orderStatus: value });
  };
  function searchInvoiceData() {
    onChange({
      limit: filters.limit,
      OrderBy: filters.OrderBy,
      sortBy: filters.sortBy,
      pageNo: filters.pageNo,
    });
    console.log("orderdata", orderdata);
  }
  const { RangePicker } = DatePicker;

  const items = [
    {
      label: "25",
      key: "1",
    },
    {
      label: "50",
      key: "2",
    },
    {
      label: "75",
      key: "3",
    },
    {
      label: "100",
      key: "4",
    },
  ];
  const menuProps = {
    items,
  };

  const { data: shopdata } = useQuery(["user-data"], getShopData, {
    staleTime: Infinity,
    onSuccess: (shopdata) => {
      console.log("shop data", shopdata.data);
    },
  });

  return (
    <div>
      {headNavFlag ? (
        <ConditionalNavigator
          selectedInvoices={selectedInvoices}
          headNavFlag={headNavFlag}
          setheadNavFlag={setheadNavFlag}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
        />
      ) : (
        <Navigator />
      )}
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "20px",
          marginLeft: "15rem",
          marginRight: "13rem",
        }}
      >
        <span style={{ width: "130px", alignSelf: "center" }}>
          {totalorders} Invoices
        </span>
        <Input.Group compact>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search by order number or customer name"
            style={{ width: "450px" }}
            onChange={onSearch}
          />
          <RangePicker
            onCalendarChange={changeDate}
            allowEmpty={[true, true]}
            value={filters.dateFilter}
          />

          <>
            <Button onClick={showDrawer}>More Filters</Button>
            <Drawer
              title="More filters"
              placement="right"
              onClose={onClose}
              open={open}
            >
              <Menu mode="inline">
                <Menu.SubMenu title="Date">
                  {" "}
                  <RangePicker
                    onCalendarChange={changeDate}
                    allowEmpty={[true, true]}
                    value={filters.dateFilter}
                  />
                </Menu.SubMenu>
                <Menu.SubMenu title="Payment status">
                  <Select
                    mode="multiple"
                    style={{
                      width: "100%",
                    }}
                    placeholder="Select value"
                    onChange={handlePayment}
                    optionLabelProp="label"
                    value={filters.paymentStatus}
                  >
                    <Option value="pending" label="pending">
                      <div className="demo-option-label-item">Pending</div>
                    </Option>
                    <Option value="voided" label="voided">
                      <div className="demo-option-label-item">Voided</div>
                    </Option>
                    <Option value="partially_paid" label="Partially paid">
                      <div className="demo-option-label-item">
                        Partially paid
                      </div>
                    </Option>
                    <Option value="authorized" label="authorized">
                      <div className="demo-option-label-item">Authorized</div>
                    </Option>
                    <Option value="refunded" label="refunded">
                      <div className="demo-option-label-item">Refunded</div>
                    </Option>
                    <Option
                      value="partially_refunded"
                      label="Partially refunded"
                    >
                      <div className="demo-option-label-item">
                        Partially refunded
                      </div>
                    </Option>
                    <Option value="paid" label="paid">
                      <div className="demo-option-label-item">Paid</div>
                    </Option>
                  </Select>
                </Menu.SubMenu>
                <Menu.SubMenu title="Fulfilment status">
                  <Select
                    mode="multiple"
                    style={{
                      width: "100%",
                    }}
                    placeholder="Select value"
                    onChange={handleFulfilment}
                    optionLabelProp="label"
                    value={filters.fulfillmentStatus}
                  >
                    <Option value="fulfilled" label="fulfilled">
                      <div className="demo-option-label-item">Fulfilled</div>
                    </Option>
                    <Option value="null" label="Unfulfilled">
                      <div className="demo-option-label-item">Unfulfilled</div>
                    </Option>

                    <Option value="partial" label="Partially fulfilled">
                      <div className="demo-option-label-item">
                        Partially fulfilled
                      </div>
                    </Option>
                    <Option value="restocked" label="Restocked">
                      <div className="demo-option-label-item">Restocked</div>
                    </Option>
                  </Select>
                </Menu.SubMenu>
                <Menu.SubMenu title="Mail status">
                  {" "}
                  <Select
                    placeholder="Select value"
                    optionFilterProp="children"
                    onChange={onChangeMailStatus}
                    value={filters.mailStatus}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "Draft",
                        label: "Draft",
                      },
                      {
                        value: "Sent",
                        label: "Sent",
                      },
                    ]}
                  />
                </Menu.SubMenu>
                <Menu.SubMenu title="Order status">
                  {" "}
                  <Select
                    showSearch
                    placeholder="Select value"
                    optionFilterProp="children"
                    onChange={onChangeOrderStatus}
                    value={filters.orderStatus}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "open",
                        label: "Open",
                      },
                      {
                        value: "cancelled",
                        label: "Cancelled",
                      },
                    ]}
                  />
                </Menu.SubMenu>
                <div style={{ bottom: 0, right: 0, position: "fixed" }}>
                  <Divider style={{ width: "350px" }} />
                  <Menu.Item>
                    {" "}
                    <Button onClick={clearAll}>Clear all filters</Button>
                  </Menu.Item>
                </div>
              </Menu>
              {/* <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p> */}
            </Drawer>
          </>
        </Input.Group>
        <Select defaultValue="25" onChange={changeLimit}>
          <Option value="25">25</Option>
          <Option value="50">50</Option>
          <Option value="75">75</Option>
          <Option value="100">100</Option>
        </Select>
      </div>
    </div>
  );
}
