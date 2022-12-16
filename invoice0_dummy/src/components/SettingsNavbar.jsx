import { Layout, Menu, Button } from "antd";
import { useState } from "react";
import icon from "./icon.png";

export default function SettingsNavbar({ navflag, setnavflag }) {
  function discard() {
    setnavflag(true);
  }
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
          <h3 style={{ marginLeft: "4rem", color: "#637381" }}>
            Unsaved Changes
          </h3>
          <div style={{ right: "0", position: "absolute" }}>
            {" "}
            <Button shape="round" type="default" onClick={discard}>
              Discard
            </Button>{" "}
            <Button shape="round" type="primary">
              Save
            </Button>
          </div>
        </Menu>
      </Layout>
    </div>
  );
}
