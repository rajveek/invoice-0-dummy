import Navigator from "./Navigation";
import { Space, Button, Divider, Card, Radio, Row, Col, Form } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import SettingsNavbar from "./SettingsNavbar";
import { getSettingsData, setInvoiceCurrency } from "./apicalls";
import { useMutation } from "@tanstack/react-query";

export default function CurrencyPage() {
  const navigate = useNavigate();
  const [initalvalues, setinitalvalues] = useState({
    currency_form: "presentment_money",
  });
  const [form] = Form.useForm();

  const { data: settingsdata } = useQuery(["settings-data"], getSettingsData, {
    staleTime: Infinity,
    onSuccess: (settingsdata) => {
      console.log("settings data", settingsdata.data);
      setinitalvalues({
        currency_form: settingsdata.data.invoiceSettings.generateInvoiceOn,
      });
    },
  });

  const invoiceCurrencyMutate = useMutation(setInvoiceCurrency, {
    onSuccess: (data) => {
      console.log(data);
      setinitalvalues({
        currency_form: data.invoiceSettings.generateInvoiceOn,
      });
    },
  });

  useEffect(() => {
    form.resetFields();
  }, [initalvalues]);

  function goBack() {
    navigate("/settings");
  }
  // function onChange(e) {
  //   console.log("radio checked", e.target.value);
  //   setValue(e.target.value);
  //   if (e.target.value != "a") {
  //     setnavflag(false);
  //   }
  //   if (e.target.value == "a") {
  //     setnavflag(true);
  //   }
  // }
  function onfinish(values) {
    console.log(values);
    invoiceCurrencyMutate.mutate(values.currency_form);
  }

  return (
    <>
      <Form initialValues={initalvalues} onFinish={onfinish} form={form}>
        <Navigator />
        <Form.Item noStyle shouldUpdate>
          {(form) => {
            console.log(form.isFieldsTouched());
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

        {/* {navflag ? (
          <Navigator />
        ) : (
          <SettingsNavbar navflag={navflag} setnavflag={setnavflag} />
        )} */}
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
            <c style={{ fontSize: "1rem" }}>Currency Settings </c>
          </Space>
        </div>
        <Divider />
        <b>Invoice Currencies</b>
        <p style={{ color: "#637381", marginTop: "5px" }}>
          Configure the currency used in your invoice
        </p>
        <Row justify="center">
          {/* <Col className="gutter-row" span={8}></Col> */}
          <Col className="gutter-row" span={8}>
            <Card>
              <Form.Item name={"currency_form"}>
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="presentment_money">
                      Use customer's checkout or payment currency on the
                      invoices
                    </Radio>
                    <Radio value="shop_money">
                      Use store currency on the invoices
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
}
