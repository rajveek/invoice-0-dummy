import { useNavigate } from "react-router-dom";
import {
  Button,
  Divider,
  Form,
  Space,
  Card,
  Input,
  Checkbox,
  Upload,
} from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import Navigator from "./Navigation";
import { getSettingsData } from "./apicalls";
import { useQuery } from "@tanstack/react-query";
export default function CompanyPage() {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const navigate = useNavigate();
  function goBack() {
    navigate("/settings");
  }
  function onfinish(values) {
    console.log(values);
  }
  const { data: settingsdata } = useQuery(["settings-data"], getSettingsData, {
    // staleTime: Infinity,
    // keepPreviousData: true,
    onSuccess: (settingsdata) => {
      console.log("settings data", settingsdata);
      //   setinitalvalues({
      //     currency_form: settingsdata.data.invoiceSettings.generateInvoiceOn,
      //   });
    },
  });
  console.log("data", settingsdata);
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
              <div style={{ fontSize: "1rem" }}>Company Page </div>
            </Space>
          </div>
          <Divider />
          <div
            style={{
              margin: "1rem 35rem 2rem 35rem",
            }}
          >
            <b>Company Details</b>
            <p>
              Choose what information you want to show in the company details
            </p>
            <Card>
              Brand className
              <Form.Item>
                <Input value={settingsdata?.data.companyDetails.brandName} />
              </Form.Item>
              Legal name of business
              <Form.Item>
                <Input />
              </Form.Item>
              Company website
              <Form.Item>
                <Input />
              </Form.Item>
              Company support email id
              <Form.Item>
                <Input value={settingsdata?.data.companyDetails.email} />
              </Form.Item>
              <p>Upload your logo (optional)</p>
              <Upload>
                <Button shape="round"> Upload</Button>
              </Upload>
              <text style={{ color: "#4d5055" }}>
                png, jpeg, jpg, gif having max 250x125px (100KB limit)
              </text>
              Phone
              <Form.Item>
                <Input />
              </Form.Item>
              Street
              <Form.Item>
                <Input />
              </Form.Item>
              Apartment, suite, etc. (optional)
              <Form.Item>
                <Input
                  value={settingsdata?.data.companyDetails.address.address1}
                />
              </Form.Item>
              City
              <Form.Item>
                <Input value={settingsdata?.data.companyDetails.address.city} />
              </Form.Item>
              Postal/Zip code
              <Form.Item>
                <Input
                  value={settingsdata?.data.companyDetails.address.postcode}
                />
              </Form.Item>
              Country/Region
              <Form.Item>
                <Input
                  value={settingsdata?.data.companyDetails.address.country}
                />
              </Form.Item>
              State
              <Form.Item>
                <Input
                  value={settingsdata?.data.companyDetails.address.state}
                />
              </Form.Item>
              Additional Info
              <Form.Item>
                <TextArea rows={4} />
              </Form.Item>
            </Card>
          </div>
        </div>
      </Form>
    </>
  );
}
