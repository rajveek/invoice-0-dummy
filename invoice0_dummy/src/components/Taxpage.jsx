import { useNavigate } from "react-router-dom";
import { Button, Divider, Form, Space, Card, Input, Checkbox } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Navigator from "./Navigation";
import { getSettingsData } from "./apicalls";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { setSettingsData } from "./apicalls";
import SettingsNavbar from "./SettingsNavbar";

export default function TaxPage() {
  const { data: settingsdata } = useQuery(["settings-data"], getSettingsData, {
    staleTime: Infinity,
    // onSuccess: (settingsdata) => {
    //   console.log("settings data", settingsdata);
    //   setinitialValues({
    //     isShowTax: settingsdata?.invoiceSettings.isShowTax,
    //     isShowIndividualTax: settingsdata?.invoiceSettings.isShowIndividualTax,
    //     isShowCustomerVatNumber:
    //       settingsdata?.invoiceSettings.isShowCustomerVatNumber,
    //     //taxNumber: settingsdata?.companyDetails.taxNumber,
    //     customerVatNumberLabel:
    //       settingsdata?.invoiceSettings.customerVatNumberLabel,
    //     isShowEmptyTaxInSummary:
    //       !settingsdata?.invoiceSettings.isShowEmptyTaxInSummary,
    //   });
    // },
  });
  const [initialValues, setinitialValues] = useState({
    isShowTax: settingsdata?.invoiceSettings.isShowTax,
    isShowIndividualTax: settingsdata?.invoiceSettings.isShowIndividualTax,
    isShowCustomerVatNumber:
      settingsdata?.invoiceSettings.isShowCustomerVatNumber,
    taxNumber: settingsdata?.companyDetails.taxNumber,
    customerVatNumberLabel:
      settingsdata?.invoiceSettings.customerVatNumberLabel,
    isShowEmptyTaxInSummary:
      !settingsdata?.invoiceSettings.isShowEmptyTaxInSummary,
  });
  console.log("initialValues", initialValues);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);
  function goBack() {
    navigate("/settings");
  }

  const TaxMutate = useMutation(setSettingsData, {
    onSuccess: (settingsdata) => {
      //console.log("settings data", settingsdata);
      setinitialValues({
        isShowTax: settingsdata?.invoiceSettings.isShowTax,
        isShowIndividualTax: settingsdata?.invoiceSettings.isShowIndividualTax,
        isShowCustomerVatNumber:
          settingsdata?.invoiceSettings.isShowCustomerVatNumber,
        taxNumber: settingsdata?.companyDetails.taxNumber,
        customerVatNumberLabel:
          settingsdata?.invoiceSettings.customerVatNumberLabel,
        isShowEmptyTaxInSummary:
          !settingsdata?.invoiceSettings.isShowEmptyTaxInSummary,
      });
    },
  });
  function onfinish(values) {
    console.log("values", values);
    const data = {
      companyDetails: { taxNumber: values.taxNumber },
      invoiceSettings: {
        isShowTax: values.isShowTax,
        isShowIndividualTax: values.isShowIndividualTax,
        isShowEmptyTaxInSummary: values.isShowEmptyTaxInSummary,
        isShowCustomerVatNumber: values.isShowCustomerVatNumber,
        customerVatNumberLabel: values.customerVatNumberLabel,
      },
    };
    TaxMutate.mutate(data);
  }
  return (
    <>
      <Form
        onFinish={onfinish}
        form={form}
        initialValues={initialValues}
        layout="vertical"
      >
        <Form.Item noStyle shouldUpdate>
          {(form) => {
            //console.log(form.isFieldsTouched());
            const isFormchanged = form.isFieldsTouched();
            if (!isFormchanged) {
              return null;
            }
            return (
              <SettingsNavbar
                style={{ color: "blue" }}
                //  style={{ position: "absolute" }}
                //loading={currencyformat.isLoading}
              />
            );
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

            <b>Taxes</b>
            <p>
              Enter your tax number and choose display settings for your tax
              details
            </p>
            <Card>
              {/* <Form.Item
                name="taxNumber"
                label=" Tax type and Tax number of your company"
                style={{ fontWeight: "bold" }}
              >
                <Input value={initialValues.taxNumber} />
              </Form.Item> */}
              <Form.Item
                label="Tax type and Tax number of your company"
                style={{ fontWeight: "bold" }}
                name="taxNumber"
              >
                <Input value={initialValues.taxNumber} />
              </Form.Item>
              <span>
                Include your tax type along with your tax number. Better to use
                GST 12345 or VAT 12345 instead of 12345.
              </span>
              <Space direction="vertical">
                <Form.Item name="isShowTax" valuePropName="checked">
                  <Checkbox defaultChecked={initialValues.isShowTax}>
                    Show tax for each product
                  </Checkbox>
                </Form.Item>
                <Form.Item name="isShowIndividualTax" valuePropName="checked">
                  <Checkbox defaultChecked={initialValues.isShowIndividualTax}>
                    Show individual tax details (if multiple taxes are applied)
                  </Checkbox>
                </Form.Item>
                <Form.Item
                  name="isShowEmptyTaxInSummary"
                  valuePropName="checked"
                >
                  <Checkbox
                    defaultChecked={initialValues.isShowEmptyTaxInSummary}
                  >
                    Do not show tax amount when the total tax is zero
                  </Checkbox>
                </Form.Item>
              </Space>
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
              Do you want to generate invoices including customer's Tax (VAT or
              GST) number on the invoice?
            </p>
            <Card style={{ color: "#4d5055" }}>
              <Form.Item name="isShowCustomerVatNumber" valuePropName="checked">
                <Checkbox
                  defaultChecked={initialValues.isShowCustomerVatNumber}
                >
                  Show customer's Tax (VAT/GST) number
                </Checkbox>
              </Form.Item>
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
                  <a href="mailto:support@mlveda.com">support@mlveda.com</a> so
                  that we can add a field to collect customer's tax details on
                  your cart page
                </p>
              </div>
              <Form.Item
                name="customerVatNumberLabel"
                label="Tax label"
                style={{ fontWeight: "bold" }}
              >
                <Input
                  placeholder="VAT:"
                  value={initialValues.customerVatNumberLabel}
                />
              </Form.Item>
              <p>
                Enter the tax type (Ex: GST or VAT). This is the label that will
                come on your invoice.
              </p>
            </Card>
          </div>
        </div>
      </Form>
    </>
  );
}
