import React from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import {
  FileTextFilled,
  SettingFilled,
  QuestionCircleFilled,
  UserOutlined,
  CaretDownFilled,
  GoogleOutlined,
} from "@ant-design/icons";
import icon from "./icon.png";
import like from "./like.png";
import hands from "./download.png";
import yes from "./yes.png";
import no from "./no.png";
import { Navigate, NavLink } from "react-router-dom";
import { Button, Dropdown, Modal, Space, Divider } from "antd";
import { useState } from "react";
import { SpaceContext } from "antd/es/space";
const { Header, Content, Footer } = Layout;

export default function Navigator() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  function navtoset() {
    // if (location.href != "/settings") {
    //   location.href = "/settings";
    // }
  }
  const items = [
    {
      label: "Hindi",
      key: "1",
    },
    {
      label: "Gujarati",
      key: "2",
    },
    {
      label: "Spanish",
      key: "3",
    },
  ];
  const menuProps = {
    items,
  };
  console.log(location.href.split("/")[3]);
  return (
    <div>
      <Layout className="layout" style={{}}>
        {/* <Menu mode="horizontal" defaultSelectedKeys={["file", "settings"]}> */}

        <Menu
          mode="horizontal"
          defaultSelectedKeys={[location.href.split("/")[3]]}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginRight: "8rem",
              marginLeft: "15rem",
            }}
          >
            <span style={{ alignSelf: "center" }}>
              <img src={icon} />
            </span>
            <b style={{ fontSize: 20 }}>Invoice Hero</b>
          </div>
          <Menu.Item key="dashboard" icon={<FileTextFilled />}>
            <NavLink to="/dashboard">INVOICES</NavLink>
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingFilled />}>
            {/* <a href="/settings">SETTINGS</a> */}
            <NavLink to="/settings">SETTINGS</NavLink>
          </Menu.Item>
          <Menu.Item key="support" icon={<QuestionCircleFilled />}>
            <NavLink to="/support">SUPPORT</NavLink>
          </Menu.Item>
          {/* <Menu.Item key="like" style={{ marginLeft: "8rem" }}> */}
          <span style={{ right: "5rem", top: 0, position: "fixed" }}>
            <span style={{ alignItems: "center" }}>
              <img src={like} onClick={showModal} />
            </span>

            <Modal
              title="Please share your experience with us"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button
                  key="link"
                  href="https://google.com"
                  type="primary"
                  onClick={handleOk}
                  style={{ background: "green" }}
                >
                  <img src={yes} />
                  Yes, I would like to write a review now
                </Button>,
                <Button
                  key="link1"
                  href="https://google.com"
                  type="primary"
                  onClick={handleCancel}
                >
                  <img src={no} />
                  No, I will review it after few days
                </Button>,
              ]}
            >
              <p>
                <img src={hands} />
              </p>
              <Divider />
              <p>
                We have put in a lot of effort to create a simple invoicing app.
                It is built exclusively for Shopify store owners to save time
                from invoicing and accounting hassles. We are continuously
                looking to make our app better. So, please write a genuine
                feedback of your experience.
              </p>
            </Modal>
            {/* </Menu.Item>
          <Menu.Item key="language"> */}
            <span style={{ marginLeft: "3rem" }}>
              <Dropdown menu={menuProps} trigger={["click"]}>
                <Button>
                  <Space>
                    <GoogleOutlined />
                    Choose language
                    <CaretDownFilled />
                  </Space>
                </Button>
              </Dropdown>
            </span>
            {/* </Menu.Item> */}
          </span>
        </Menu>
      </Layout>
    </div>
  );
}
