import React from "react";
import { Modal, Layout, Menu, Tooltip } from "antd";
import { CaretDownFilled } from "@ant-design/icons";
import icon from "./icon.png";

import { Button, Dropdown, Space } from "antd";
import { useState } from "react";

export default function ConditionalNavigator({
  selectedInvoices,
  headNavFlag,
  setheadNavFlag,
  selectedRowKeys,
  setSelectedRowKeys,
}) {
  console.log("flag------------", headNavFlag);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function onCancel() {
    setheadNavFlag(false);
    setSelectedRowKeys([]);
  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const items = [
    {
      label: "Send invoices to customers",
      key: "1",
    },
    {
      label: "Send individual invoices to me",
      key: "2",
    },
    {
      label: "Send merged invoice to me",
      key: "3",
    },
  ];
  const menuProps = {
    items,
  };
  const text = <span>You will receive merged pdf in your mail.</span>;
  // const items = [
  //   {
  //     label: "You will receive merged pdf in your mail",
  //     key: "1",
  //   },
  // ];
  // const menuProp = {
  //   items,
  // };
  return (
    <div>
      <Layout className="layout">
        <Menu mode="horizontal" style={{ height: "3.7rem" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <span style={{ alignSelf: "center" }}>
              <img src={icon} />
            </span>
            <b
              style={{
                fontSize: 20,
                textAlign: "center",
                alignSelf: "center",
              }}
            >
              Invoice Hero
            </b>
          </div>

          <h3 style={{ marginLeft: "4rem" }}>
            selected {selectedInvoices} invoices
          </h3>
          <div style={{ right: "0", position: "absolute" }}>
            <span>
              <a
                style={{
                  marginLeft: "1rem",
                  textAlign: "center",
                  alignSelf: "center",
                }}
                onClick={onCancel}
              >
                Cancel
              </a>
            </span>
            <Dropdown menu={menuProps} trigger={["click"]}>
              <Button
                style={{
                  color: "#00a2ff",
                  border: "1px solid #00a2ff",
                  borderRadius: "100px",
                  marginLeft: "1rem",
                  alignSelf: "center",
                }}
              >
                <Space>
                  More
                  <CaretDownFilled />
                </Space>
              </Button>
            </Dropdown>

            <Tooltip placement="bottom" title={text} onClick={showModal}>
              <Button
                type="primary"
                style={{
                  background: "#00a2ff",
                  borderRadius: "100px",
                  fontSize: "12px",
                  color: "white",
                  alignSelf: "center",
                  marginLeft: "1rem",
                }}
              >
                Merge PDF
              </Button>
            </Tooltip>
            <Modal
              title="Bulk pdf"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="ok" type="primary" onClick={handleCancel}>
                  close
                </Button>,
              ]}
            >
              <p>Sending to your email id: jatin.parate@mlveda.com</p>
            </Modal>
          </div>
        </Menu>
      </Layout>
    </div>
  );
}
