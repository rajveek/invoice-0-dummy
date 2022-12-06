import Navigator from "./Navigation";
import { Card, Avatar, Button, Divider, Space } from "antd";
import { InfoOutlined, UserOutlined } from "@ant-design/icons";
import rajesh from "./rajesh.jpg";

export default function Support() {
  return (
    <div>
      <Navigator />
      <div
        style={{
          margin: "1rem 30rem 2rem 30rem",
        }}
      >
        <span style={{ textAlign: "left" }}>
          <div>Dedicated relationship manager</div>
          <div style={{ textAlign: "left", color: "gray", marginTop: "5px" }}>
            Need any help with setup or customization? Contact your dedicated
            relationship manager details.
          </div>
        </span>
        <Card style={{ marginTop: "1rem" }}>
          <Avatar
            size={100}
            src={rajesh}
            style={{
              borderColor: "#d9d9d9",
              borderStyle: "solid",
              border: "1rem ",
            }}
          />
          <h2>Rajesh</h2>
          <span style={{ marginTop: "0px" }}>Shopify expert</span>
          <div style={{ marginTop: "1rem" }}>
            <span>
              Send us a mail at{" "}
              <a href="mailto:support@mlveda.com" target="_blank">
                <span>
                  <span>
                    <span>support@mlveda.com</span>
                  </span>
                </span>
              </a>{" "}
              and our awesome support team will get back to you within 24 hours.
            </span>
            <p>
              <Button
                style={{
                  color: "#00a2ff",
                  border: "1px solid #00a2ff",
                  borderRadius: "100px",
                }}
              >
                Request Callback
              </Button>
            </p>
          </div>
        </Card>
        <Divider />
        <div style={{ textAlign: "left", color: "red" }}>
          <span>Delete & Uninstalling</span>
          <p>Danger zone</p>
        </div>
        <Card>
          <div
            style={{ border: "1px solid #47c1bf", backgroundColor: "#d2efee" }}
          >
            <span>
              <InfoOutlined
                style={{
                  backgroundColor: "#47c1bf",
                  borderRadius: "6px",
                  marginRight: "5px",
                }}
              />
              <span style={{ color: "GrayText" }}>
                If you are facing any issues, please contact your dedicated
                relationship manager before deleting the app.
              </span>
            </span>
          </div>
          <p>
            <h3 style={{ textAlign: "left" }}>
              Current App Status:{" "}
              <span style={{ color: "#04cea4" }}>Live & Working</span>
            </h3>
          </p>
          <p style={{ textAlign: "left" }}>
            Our app will not insert any code on your store themes etc. So to
            delete or uninstall Invoice Hero, simply delete Invoice Hero app
            from your apps in Shopify admin.
          </p>
          <div style={{ textAlign: "left" }}>
            <Button
              style={{
                color: "red",
                border: "1px solid red",
                borderRadius: "100px",
              }}
            >
              Delete App
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
