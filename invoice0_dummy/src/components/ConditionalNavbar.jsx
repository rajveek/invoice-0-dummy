import React from "react";
import { Modal, Layout, Menu, Tooltip } from "antd";
import { useMutation } from "@tanstack/react-query";
import { CaretDownFilled } from "@ant-design/icons";
import icon from "./icon.png";

import { Button, Dropdown, Space } from "antd";
import { useState } from "react";
import { mergePdfAction, sendInvoiceCust, sendInvoiceMe } from "./apicalls";

export default function ConditionalNavigator({
  selectedInvoices,
  headNavFlag,
  setheadNavFlag,
  selectedRowKeys,
  setSelectedRowKeys,
}) {
  //console.log(selectedRowKeys);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [message, setMessage] = useState();

  const mergepfdMutate = useMutation(mergePdfAction, {
    useErrorBoundary: true,
    staleTime: 10000 * 60 * 60,
    onSuccess: (res) => {
      if (res.status == "success") {
        setIsModalOpen(true);
        setMessage(res.message);
      } else {
        setIsModalOpen1(true);
      }
    },
  });
  const sendCustMutate = useMutation(sendInvoiceCust, {
    useErrorBoundary: true,
    staleTime: 10000 * 60 * 60,
    onSuccess: (res) => {
      if (res.status == "success") {
        setIsModalOpen2(true);
        setMessage(res.message);
      } else {
        setIsModalOpen1(true);
      }
    },
  });

  const sendMeMutate = useMutation(sendInvoiceMe, {
    useErrorBoundary: true,
    staleTime: 10000 * 60 * 60,
    onSuccess: (res) => {
      if (res.status == "success") {
        setIsModalOpen3(true);
        setMessage(res.message);
      } else {
        setIsModalOpen1(true);
      }
    },
  });

  function Merge() {
    mergepfdMutate.mutate(selectedRowKeys);
  }

  function onCancel() {
    setheadNavFlag(false);
    setSelectedRowKeys([]);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    onCancel();
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
    onCancel();
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
    onCancel();
  };

  const handleCancel3 = () => {
    setIsModalOpen3(false);
    onCancel();
  };
  const items = [
    {
      label: "Send invoices to customers",
      key: "1",
      onClick: () => {
        sendCustMutate.mutate(selectedRowKeys);
      },
    },
    {
      label: "Send individual invoices to me",
      key: "2",
      onClick: () => {
        sendMeMutate.mutate(selectedRowKeys);
      },
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
            <Dropdown menu={menuProps} trigger={["click"]} on>
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
            <Modal
              title="Success"
              open={isModalOpen2}
              //onOk={handleOk1}
              onCancel={handleCancel2}
              footer={[
                <Button
                  key="ok"
                  type="primary"
                  onClick={handleCancel2}
                  url="/pricing"
                >
                  ok
                </Button>,
              ]}
            >
              <p>{message}</p>
            </Modal>
            <Modal
              title="Success"
              open={isModalOpen3}
              onCancel={handleCancel3}
              footer={[
                <Button key="ok" type="primary" onClick={handleCancel3}>
                  close
                </Button>,
              ]}
            >
              <p>{message}</p>
            </Modal>

            {/* <Tooltip placement="bottom" title={text} onClick={showModal}> */}
            <Tooltip placement="bottom" title={text} onClick={Merge}>
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
              //onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="ok" type="primary" onClick={handleCancel}>
                  close
                </Button>,
              ]}
            >
              <p>{message}</p>
            </Modal>
            <Modal
              title="Upgrade"
              open={isModalOpen1}
              //onOk={handleOk1}
              onCancel={handleCancel1}
              footer={[
                <Button
                  key="ok"
                  type="primary"
                  onClick={handleCancel1}
                  url="/pricing"
                >
                  Start 7 day free trial now.
                </Button>,
              ]}
            >
              <p>
                This feature is available only for the customers who are using
                the paid version of the app.
              </p>
            </Modal>
          </div>
        </Menu>
      </Layout>
    </div>
  );
}
