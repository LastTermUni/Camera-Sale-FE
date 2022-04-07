import React from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 7,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 0,
    },
  },
};
export function Register() {
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );
  const onFinish = (values) => {
    values.preventDefault();
    let data = values.target.value;
    console.log("Received values of form: ", data);
  };

  const [form] = Form.useForm();

  return (
    <>
      <Layout style={{ height: "100vh", margin: "auto" }}>
        <Row justify={"center"} style={{ marginTop: "30px" }}>
          <div className="box-register">
            <div
              style={{
                fontSize: "25px",
                fontWeight: "500",
                textAlign: "center",
                marginBottom: "10px",
                fontFamily: "monospace",
              }}
            >
              Đăng ký
            </div>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{
                prefix: "84",
              }}
              scrollToFirstError
            >
              <Form.Item
                name="email"
                value=""
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "Đây không phải là email!",
                  },
                  {
                    required: true,
                    message: "Hãy nhập E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập mật khẩu!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Xác nhận mật khẩu"
                value=""
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Hãy xác nhận mật khẩu!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Hai mật khẩu không giống nhau!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="nickname"
                label="Tên"
                value=""
                tooltip="Chúng tôi sẽ gọi bạn bằng ?"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên của bạn!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                value=""
                label="Số điện thoại"
                rules={[{ required: true, message: "Hãy nhập số điện thoại!" }]}
              >
                <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
              </Form.Item>

              <Checkbox style={{ marginLeft: "33%", marginBottom: "10px" }}>
                Tôi chấp nhận <a href="">điều khoản</a>
              </Checkbox>
              <Form.Item
                {...tailFormItemLayout}
                style={{ justifyContent: "center" }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="register-form-button"
                >
                  Đăng ký
                </Button>
                <div style={{ float: "right" }}>
                  Đã có tài khoản?
                  <NavLink to="/login"> Đăng nhập!</NavLink>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Row>
      </Layout>
    </>
  );
}
