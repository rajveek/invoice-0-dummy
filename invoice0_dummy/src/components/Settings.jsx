import Navigator from "./Navigation";
import { useState } from "react";
import { Modal, Button, Divider, Input, Row, Col, Space } from "antd";
import mail from "./mail.png";
import tax from "./tax.png";
import shipping from "./shipping.png";
import discount from "./discount.png";
import currency from "./currency.png";
import language from "./language.png";
import design from "./design.png";
import billing from "./billing.png";
import company from "./company.png";
import pricing from "./pricing.png";
import { NavLink } from "react-router-dom";

export default function Settings_page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const style = {
    background: "#0092ff",
    padding: "8px 0",
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Navigator />
      <div
        style={{
          marginTop: "2rem",
          borderRadius: "6px",
          border: "2px  ",
          marginRight: "30rem",
          marginLeft: "30rem",
          padding: "5px 10px 5px 10px",
          justifyContent: "space-between",
          borderColor: "#d9d9d9",
          borderStyle: "solid",
          display: "flex",
        }}
      >
        <Space>
          <div style={{ color: "gray" }}>Automatic invoice sending is</div>
          <Button
            type="primary"
            style={{
              background: "#bbe5b3",
              borderRadius: "100px",
              fontSize: "12px",
              color: "gray",
            }}
          >
            Enabled
          </Button>
        </Space>
        <Button
          onClick={showModal}
          style={{
            color: "#00a2ff",
            border: "1px solid #00a2ff",
            borderRadius: "100px",
          }}
        >
          Edit
        </Button>

        <Modal
          title="Do you want to stop sending invoices automatically for your future
            orders?"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="confirm" type="primary" onClick={handleOk}>
              Confirm
            </Button>,
            <Button key="cancel" onClick={handleOk}>
              Cancel
            </Button>,
          ]}
        >
          <Divider />
          <p></p>
        </Modal>
      </div>
      <Divider />
      <Input
        placeholder="Search "
        style={{ width: "550px" }}
        //onSearch={onSearch}
      />
      <Row gutter={[16, 24]} style={{ marginTop: "2rem" }}>
        <Col className="gutter-row" span={4}></Col>
        <Col className="gutter-row" span={3}>
          <div>
            <figure>
              <img src={mail} />
              <figcaption>
                {" "}
                <a href="">Email</a>{" "}
              </figcaption>
            </figure>
          </div>
        </Col>
        <Col className="gutter-row" span={3}>
          <div>
            <figure>
              <img src={tax} />
              <figcaption>
                {" "}
                <a href="">Tax</a>{" "}
              </figcaption>
            </figure>
          </div>
        </Col>
        <Col className="gutter-row" span={3}>
          <div>
            <figure>
              <img src={shipping} />
              <figcaption>
                {" "}
                <a href="">Shipping</a>{" "}
              </figcaption>
            </figure>
          </div>
        </Col>
        <Col className="gutter-row" span={3}>
          <div>
            <figure>
              <img src={discount} />
              <figcaption>
                {" "}
                <a href="">Discount</a>{" "}
              </figcaption>
            </figure>
          </div>
        </Col>
        <Col className="gutter-row" span={3}>
          <div>
            <figure>
              <img src={currency} />
              <figcaption>
                {" "}
                {/* <a href="/settings/currency-settings">Currency</a>{" "} */}
                <NavLink to="/settings/currency-settings">Currency</NavLink>
              </figcaption>
            </figure>
          </div>
        </Col>
        <Col className="gutter-row" span={4}></Col>
        <Col className="gutter-row" span={4}></Col>
        <Col className="gutter-row" span={3}>
          <div>
            <figure>
              <img src={language} />
              <figcaption>
                {" "}
                <a href="">Language, Terms & Headings</a>{" "}
              </figcaption>
            </figure>
          </div>
        </Col>
        <Col className="gutter-row" span={3}>
          <div>
            <figure>
              <img src={design} />
              <figcaption>
                {" "}
                <a href="">Design & Options</a>{" "}
              </figcaption>
            </figure>
          </div>
        </Col>
        <Col className="gutter-row" span={3}>
          <div>
            <figure>
              <img src={billing} />
              <figcaption>
                {" "}
                <a href="">Billing & Shipping</a>{" "}
              </figcaption>
            </figure>
          </div>
        </Col>
        <Col className="gutter-row" span={3}>
          <div>
            <figure>
              <img src={company} />
              <figcaption>
                {" "}
                <a href="">Company</a>{" "}
              </figcaption>
            </figure>
          </div>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={4}></Col>
        <Col className="gutter-row" span={3}>
          <div>
            <figure>
              <img src={pricing} />
              <figcaption>
                {" "}
                {/* <a href="/pricing?utm_source=dashboard&utm_medium=user&utm_campaign=settings">
                  Pricing
                </a>{" "} */}
                <NavLink to="/pricing?utm_source=dashboard&utm_medium=user&utm_campaign=settings">
                  Pricing
                </NavLink>
              </figcaption>
            </figure>
          </div>
        </Col>
      </Row>
    </div>
  );
}
