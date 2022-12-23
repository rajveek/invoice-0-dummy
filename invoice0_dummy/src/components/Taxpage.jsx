import { useNavigate } from "react-router-dom";
import { Button, Divider, Form, Space, Card, Input, Checkbox } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Navigator from "./Navigation";
import { getSettingsData } from "./apicalls";
import { useQuery } from "@tanstack/react-query";
export default function TaxPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  function goBack() {
    navigate("/settings");
  }
  function onfinish(values) {
    console.log(values);
  }
  const { data: settingsdata } = useQuery(["settings-data"], getSettingsData, {
    staleTime: Infinity,
    onSuccess: (settingsdata) => {
      //console.log("settings data", settingsdata.data);
      // setinitalvalues({
      //   currency_form: settingsdata.data.invoiceSettings.generateInvoiceOn,
      // });
    },
  });
  console.log("aaaaaa", settingsdata);
  return (
    <>
      <Form onFinish={onfinish} form={form}>
        <div style={{ color: "#4d5055", textAlign: "left" }}>
          <Navigator />
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
              <div style={{ fontSize: "1rem" }}>Tax Settings </div>
            </Space>
          </div>
          <Divider />
          <div
            style={{
              margin: "1rem 35rem 2rem 35rem",
            }}
          >
            <div
              style={{
                backgroundColor: "#e1f5fd",
                borderTopColor: "#00a2ff",
                borderTopStyle: "solid",
                padding: "10px",
              }}
            >
              <b>Important info :</b>
              <p>
                You can configure tax settings only from{" "}
                <a href="https://teckie-supplies-4.myshopify.com/admin/settings/taxes">
                  Shopify Admin
                </a>
                . Invoice Hero will create invoices accordingly. You do not need
                to do anything here.
              </p>
            </div>
            <Form.Item>
              <b>Taxes</b>
              <p>
                Enter your tax number and choose display settings for your tax
                details
              </p>
              <Card>
                <p>
                  Tax type and Tax number of your company <Input />
                  Include your tax type along with your tax number. Better to
                  use GST 12345 or VAT 12345 instead of 12345.
                </p>
                <Checkbox.Group>
                  <Space direction="vertical">
                    <Checkbox value="a">Show tax for each product</Checkbox>
                    <Checkbox value="b">
                      Show individual tax details (if multiple taxes are
                      applied)
                    </Checkbox>
                    <Checkbox value="c">
                      Do not show tax amount when the total tax is zero
                    </Checkbox>
                  </Space>
                </Checkbox.Group>
              </Card>
              <Divider></Divider>
              <b>Customer's GST/VAT number </b>
              <Button
                style={{
                  color: "#00a2ff",
                  border: "1px solid #00a2ff",
                  borderRadius: "100px",
                }}
              >
                PRO
              </Button>
              <p>
                Do you want to generate invoices including customer's Tax (VAT
                or GST) number on the invoice?
              </p>
              <Card style={{ color: "#4d5055" }}>
                <Checkbox>Show customer's Tax (VAT/GST) number</Checkbox>
                <div
                  style={{
                    backgroundColor: "#fbf3e3",
                    padding: "10px",
                    marginTop: "10px",
                  }}
                >
                  <b>Important info :</b>
                  <p>
                    You must send an email to{" "}
                    <a href="mailto:support@mlveda.com">support@mlveda.com</a>{" "}
                    so that we can add a field to collect customer's tax details
                    on your cart page
                  </p>
                </div>
                <b>Tax label </b>
                <Input placeholder="VAT:" />
                <p>
                  Enter the tax type (Ex: GST or VAT). This is the label that
                  will come on your invoice.
                </p>
              </Card>
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  );
}
