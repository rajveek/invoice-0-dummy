import { useNavigate } from "react-router-dom";
import {
  Button,
  Divider,
  Form,
  Space,
  Card,
  Input,
  Upload,
  message,
} from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import Navigator from "./Navigation";
import { getSettingsData, setSettingsData } from "./apicalls";
import SettingsNavbar from "./SettingsNavbar";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export default function CompanyPage() {
  const [initialValues, setinitialValues] = useState({});
  const [msgerror, setmsgerror] = useState("");
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const navigate = useNavigate();

  function goBack() {
    navigate("/settings");
  }

  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/gif";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      setmsgerror("You can only upload JPG/PNG file!");
    } else {
      setmsgerror("");
    }
    console.log("files size", file.size);
    const isLt2M = file.size / 1000 < 100;
    if (!isLt2M) {
      message.error("Image must smaller than 100kb");
      setmsgerror("Image must smaller than 100kb");
    } else {
      setmsgerror("");
    }
    return isJpgOrPng && isLt2M;
  };
  console.log("msgerror is :", msgerror);

  function onfinish(values) {
    console.log(values);
    values.logo = values.logo.file ? values.logo.file.thumbUrl : values.logo;
    if (!values.logo) {
      //console.log("undefined");
      values.logo = "";
    }

    const data = {
      companyDetails: {
        address: {
          address1: values.address1,
          address2: values.address2,
          city: values.city,
          country: values.country,
          postcode: values.postcode,
          state: values.state,
        },
        brandName: values.brandName,
        email: values.email,
        legalNameForBusiness: values.legalNameForBusiness,
        logo: values.logo,
        phone: values.phone,
        website: values.website,
      },
    };
    companyMutate.mutate(data);
  }
  const { data: settingsdata } = useQuery(["settings-data"], getSettingsData, {
    staleTime: Infinity,
    onSuccess: (settingsdata) => {
      //console.log("settings data", settingsdata);
      setinitialValues({
        brandName: settingsdata?.companyDetails.brandName,
        email: settingsdata?.companyDetails.email,
        address1: settingsdata?.companyDetails.address.address1,
        address2: settingsdata?.companyDetails.address.address2,
        phone: settingsdata?.companyDetails.phone,
        website: settingsdata?.companyDetails.website,
        logo: settingsdata?.companyDetails.logo,
        legalNameForBusiness: settingsdata?.companyDetails.legalNameForBusiness,
        city: settingsdata?.companyDetails.address.city,
        postcode: settingsdata?.companyDetails.address.postcode,
        country: settingsdata?.companyDetails.address.country,
        state: settingsdata?.companyDetails.address.state,
      });
    },
  });
  console.log("initial values", initialValues);

  const companyMutate = useMutation(setSettingsData, {
    onSuccess: (settingsdata) => {
      //console.log("settings data", settingsdata);
      setinitialValues({
        brandName: settingsdata?.companyDetails.brandName,
        email: settingsdata?.companyDetails.email,
        address1: settingsdata?.companyDetails.address.address1,
        address2: settingsdata?.companyDetails.address.address2,
        phone: settingsdata?.companyDetails.phone,
        website: settingsdata?.companyDetails.website,
        logo: settingsdata?.companyDetails.logo,
        legalNameForBusiness: settingsdata?.companyDetails.legalNameForBusiness,
        city: settingsdata?.companyDetails.address.city,
        postcode: settingsdata?.companyDetails.address.postcode,
        country: settingsdata?.companyDetails.address.country,
        state: settingsdata?.companyDetails.address.state,
      });
    },
  });

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  return (
    <>
      <Form
        onFinish={onfinish}
        form={form}
        initialValues={initialValues}
        layout="vertical"
      >
        {/* <Form.Item noStyle shouldUpdate>
          {(form) => {
            console.log(form.isFieldsTouched());
            const isFormchanged = form.isFieldsTouched();
            if (!isFormchanged) {
              return null;
            }
            return (
              <SettingsNavbar
                style={{ color: "blue", zIndex: 1, position: "absolute" }}
              />
            );
          }}
        </Form.Item> */}
        <Form.Item noStyle shouldUpdate>
          {(form) => {
            console.log(form, form.isFieldsTouched());
            const isFormchanged = form.isFieldsTouched();
            if (!isFormchanged) {
              return null;
            }
            return <SettingsNavbar style={{}} />;
          }}
        </Form.Item>
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
              <Form.Item label="Brand className" name="brandName">
                <Input value={initialValues.brandName} />
              </Form.Item>

              <Form.Item
                label="Legal name of business"
                name="legalNameForBusiness"
              >
                <Input value={initialValues.legalNameForBusiness} />
              </Form.Item>

              <Form.Item label="Company website" name="website">
                <Input value={initialValues.website} />
              </Form.Item>

              <Form.Item label="Company support email id" name="email">
                <Input value={initialValues.email} />
              </Form.Item>
              {/* <Form.Item label="Upload your logo (optional)" name="logo">
                <Upload maxCount={1} value={initialValues.logo}>
                  <Button shape="round"> Upload</Button>
                </Upload>
                <text style={{ color: "#4d5055" }}>
                  png, jpeg, jpg, gif having max 250x125px (100KB limit)
                </text>
              </Form.Item> */}
              <Form.Item
                name="logo"
                label="Upload your logo (optional)"
                extra="png, jpeg, jpg, gif having max 250x125px (100KB limit)"
                style={{ fontWeight: "bold" }}
              >
                <Upload
                  name="upload"
                  listType="picture"
                  showUploadList={msgerror == "" ? true : false}
                  defaultFileList={
                    initialValues.logo !== "" &&
                    initialValues.logo !== undefined &&
                    initialValues.logo !== null
                      ? [{ url: initialValues.logo }]
                      : []
                  }
                  maxCount={1}
                  beforeUpload={beforeUpload}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item label="Phone" name="phone">
                <Input value={initialValues.phone} />
              </Form.Item>

              <Form.Item label="Street" name="address2">
                <Input value={initialValues.address2} />
              </Form.Item>

              <Form.Item
                label="Apartment, suite, etc. (optional)"
                name="address1"
              >
                <Input value={initialValues.address1} />
              </Form.Item>

              <Form.Item label="City" name="city">
                <Input value={initialValues.city} />
              </Form.Item>

              <Form.Item label="Postal/Zip code" name="postcode">
                <Input value={initialValues.postcode} />
              </Form.Item>

              <Form.Item label="Country/Region" name="country">
                <Input value={initialValues.country} />
              </Form.Item>

              <Form.Item label="State" name="state">
                <Input value={initialValues.state} />
              </Form.Item>

              <Form.Item label="Additional Info">
                <TextArea rows={4} />
              </Form.Item>
            </Card>
          </div>
        </div>
      </Form>
    </>
  );
}
