import Navigator from "./Navigation";
import { Space, Button, Divider, Card, Radio, Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SettingsNavbar from "./SettingsNavbar";

export default function CurrencyPage() {
  const navigate = useNavigate();
  const [value, setValue] = useState("a");
  const [navflag, setnavflag] = useState(true);

  function goBack() {
    navigate("/settings");
  }
  function onChange(e) {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    if (e.target.value != "a") {
      setnavflag(false);
    }
    if (e.target.value == "a") {
      setnavflag(true);
    }
  }

  return (
    <>
      {navflag ? (
        <Navigator />
      ) : (
        <SettingsNavbar navflag={navflag} setnavflag={setnavflag} />
      )}
      <div
        style={{
          float: "left",
          paddingLeft: "235px",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Space>
          <Button
            shape="circle"
            style={{ color: "#00a2ff", border: "1px solid #00a2ff" }}
            onClick={goBack}
          >
            <ArrowLeftOutlined />
          </Button>
          <c style={{ fontSize: "1rem" }}>Currency Settings </c>
        </Space>
      </div>
      <Divider />
      <b>Invoice Currencies</b>
      <p style={{ color: "#637381", marginTop: "5px" }}>
        Configure the currency used in your invoice
      </p>
      <Row justify="center">
        {/* <Col className="gutter-row" span={8}></Col> */}
        <Col className="gutter-row" span={8}>
          <Card>
            <Radio.Group onChange={onChange} value={value}>
              <Space direction="vertical">
                <Radio value="a">
                  Use customer's checkout or payment currency on the invoices
                </Radio>
                <Radio value="b">Use store currency on the invoices</Radio>
              </Space>
            </Radio.Group>
          </Card>
        </Col>
      </Row>
    </>
  );
}
