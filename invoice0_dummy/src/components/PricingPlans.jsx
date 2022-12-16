import { Col, Row, Card, Space, Typography, Divider, Button } from "antd";
import {
  PercentageOutlined,
  CheckCircleTwoTone,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Navigator from "./Navigation";
import gaurantee from "./gaurantee.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Text, Paragraph } = Typography;

export default function PricingPage() {
  const navigate = useNavigate();
  const [flag, setflag] = useState(false);

  function changeFlag() {
    if (flag == false) {
      setflag(true);
      console.log("flag true");
    } else if (flag == true) {
      setflag(false);
      console.log("flag false");
    }
  }
  function goBack() {
    navigate("/settings");
  }
  return (
    <div>
      <Navigator></Navigator>
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
          <c style={{ fontSize: "1rem" }}>Invoice Hero Pricing Plans </c>
        </Space>
      </div>
      <Divider />
      <Row style={{ marginTop: "2rem" }}>
        <Col className="gutter-row" span={4}></Col>
        <Col className="gutter-row" span={4}>
          <Card>
            <span style={{ fontSize: "2rem", alignText: "left" }}>Gold</span>
            <div style={{ fontSize: "1.5rem" }}>
              <sup>$</sup> <b>3</b> <sup>/month</sup>
            </div>
            <Space>
              {" "}
              <Text type="danger">
                <PercentageOutlined />
              </Text>
              <s style={{ textEmphasisColor: "black" }}>$5</s>
              <Text type="success">40 % off</Text>
            </Space>
            <Divider />
            <b style={{ fontSize: "1.5rem" }}>150 FREE invoices/month</b>
            <div>3 ¢/invoice AFTER FREE</div>
            <Divider />
            <span style={{ fontSize: "1rem" }}>
              Best suited for stores getting up to 150 orders per month
            </span>
            <p>
              <Button shape="round" type="primary">
                Start Free
              </Button>
            </p>
            <CheckCircleTwoTone />
            <p>Secured by Shopify billing. Free for 7 days</p>
            <img src={gaurantee} />
            {flag ? (
              <Button type="link" block onClick={changeFlag}>
                See less details
              </Button>
            ) : (
              <Button type="link" block onClick={changeFlag}>
                See more details
              </Button>
            )}
            {flag ? (
              <Paragraph>
                <ul>
                  <li>Send up to 150 invoices/month</li>
                  <li>Multiple Invoice designs</li>
                  <li>Automatic invoice creation and sending</li>
                  <li>Multi-currency support</li>
                  <li>Multi-language support (61 languages)</li>
                  <li>Set Custom invoice number</li>
                  <li>Include your invoice terms & conditions</li>
                  <li>Send the invoices to your customers in bulk</li>
                  <li>Download the invoices in bulk</li>
                  <li>Customize the emails (content & subject)</li>
                  <li>Send marketing pdfs (coming soon)</li>
                  <li>Generate proforma invoices</li>
                  <li>Priority support</li>
                </ul>
              </Paragraph>
            ) : (
              <></>
            )}
          </Card>
        </Col>
        <Col className="gutter-row" span={4}>
          <Card>
            <span style={{ fontSize: "2rem", alignText: "left" }}>
              Platinum
            </span>
            <div style={{ fontSize: "1.5rem" }}>
              <sup>$</sup> <b>7</b> <sup>/month</sup>
            </div>
            <Space>
              {" "}
              <Text type="danger">
                <PercentageOutlined />
              </Text>
              <s style={{ textEmphasisColor: "black" }}>$9</s>
              <Text type="success">23 % off</Text>
            </Space>
            <Divider />
            <b style={{ fontSize: "1.5rem" }}>500 FREE invoices/month</b>
            <div>2 ¢/invoice AFTER FREE</div>
            <Divider />
            <span style={{ fontSize: "1rem" }}>
              Best suited for stores getting up to 500 orders per month
            </span>
            <p>
              <Button shape="round" type="primary">
                Start Free
              </Button>
            </p>
            <CheckCircleTwoTone />
            <p> Secured by Shopify billing. Free for 7 days</p>
            <img src={gaurantee} />
            {flag ? (
              <Button type="link" block onClick={changeFlag}>
                See less details
              </Button>
            ) : (
              <Button type="link" block onClick={changeFlag}>
                See more details
              </Button>
            )}
            {flag ? (
              <Paragraph style={{ justifyContent: "left" }}>
                <ul>
                  <li>Send up to 500 invoices/month</li>
                  <li>Multiple Invoice designs</li>
                  <li>Automatic invoice creation and sending</li>
                  <li>Multi-currency support</li>
                  <li>Multi-language support (61 languages)</li>
                  <li>Set Custom invoice number</li>
                  <li>Include your invoice terms & conditions</li>
                  <li>Send the invoices to your customers in bulk</li>
                  <li>Download the invoices in bulk</li>
                  <li>Customize the emails (content & subject)</li>
                  <li>Send marketing pdfs (coming soon)</li>
                  <li>Generate proforma invoices</li>
                  <li>Priority support</li>
                </ul>
              </Paragraph>
            ) : (
              <></>
            )}
          </Card>
        </Col>
        <Col className="gutter-row" span={4}>
          <Card>
            <span style={{ fontSize: "2rem", alignText: "left" }}>Diamond</span>
            <div style={{ fontSize: "1.5rem" }}>
              <sup>$</sup> <b>8</b> <sup>/month</sup>
            </div>
            <Space>
              {" "}
              <Text type="danger">
                <PercentageOutlined />
              </Text>
              <s style={{ textEmphasisColor: "black" }}>$13</s>
              <Text type="success">39 % off</Text>
            </Space>
            <Divider />
            <b style={{ fontSize: "1.5rem" }}>
              <span>&#8734;</span> FREE invoices/month
            </b>
            <div>UNLIMITED FREE invoices</div>
            <Divider />
            <span style={{ fontSize: "1rem" }}>
              Best suited for stores getting more than 500 orders per month
            </span>
            <p>
              <Button
                shape="round"
                style={{ background: "#04cea4", color: "#fff" }}
              >
                Start Free
              </Button>
            </p>
            <CheckCircleTwoTone />
            <p> Secured by Shopify billing. Free for 7 days</p>
            <img src={gaurantee} />
            {flag ? (
              <Button type="link" block onClick={changeFlag}>
                See less details
              </Button>
            ) : (
              <Button type="link" block onClick={changeFlag}>
                See more details
              </Button>
            )}
            {flag ? (
              <Paragraph>
                <ul>
                  <li>Send up to 150 invoices/month</li>
                  <li>Multiple Invoice designs</li>
                  <li>Automatic invoice creation and sending</li>
                  <li>Multi-currency support</li>
                  <li>Multi-language support (61 languages)</li>
                  <li>Set Custom invoice number</li>
                  <li>Include your invoice terms & conditions</li>
                  <li>Send the invoices to your customers in bulk</li>
                  <li>Download the invoices in bulk</li>
                  <li>Customize the emails (content & subject)</li>
                  <li>Send marketing pdfs (coming soon)</li>
                  <li>Generate proforma invoices</li>
                  <li>Priority support</li>
                </ul>
              </Paragraph>
            ) : (
              <></>
            )}
          </Card>
        </Col>
        <Col className="gutter-row" span={4}>
          <Card>
            <span style={{ fontSize: "2rem", alignText: "left" }}>Free</span>
            <div style={{ fontSize: "1.5rem" }}>
              <sup>$</sup> <b>0</b> <sup>/month</sup>
            </div>
            <Space> </Space>
            <Divider />
            <b style={{ fontSize: "1.5rem" }}>50 FREE invoices/month</b>

            <Divider />
            <span style={{ fontSize: "1rem" }}>
              Best suited for stores getting up to 50 orders per month
            </span>
            <p>
              <Button
                shape="round"
                style={{ color: "#00a2ff", border: "1px solid #00a2ff" }}
              >
                Select
              </Button>
            </p>

            {flag ? (
              <Button type="link" block onClick={changeFlag}>
                See less details
              </Button>
            ) : (
              <Button type="link" block onClick={changeFlag}>
                See more details
              </Button>
            )}
            {flag ? (
              <Paragraph>
                <ul>
                  <li>Send up to 50 invoices/month</li>
                  <li>Multiple Invoice designs</li>
                  <li>Print, send & download invoices</li>
                  <li>Best support</li>
                </ul>
              </Paragraph>
            ) : (
              <></>
            )}
          </Card>
        </Col>
        <Col className="gutter-row" span={4}></Col>
      </Row>
    </div>
  );
}
