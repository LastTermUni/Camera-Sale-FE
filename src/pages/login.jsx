import React from "react";
import { Button, Checkbox, Col, Form, Input, Layout, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../redux/action";

export function Login() {
  const dispatch = useDispatch();
  dispatch(actions.getCustomer.getCustomerRequest());

  return (
    <>
      <Layout style={{ height: "100vh", margin: "auto" }}>
        <Row justify={"center"} style={{ marginTop: "30px" }}>
          <div className="box-login">
            <div
              style={{
                fontSize: "25px",
                fontWeight: "500",
                textAlign: "center",
                marginBottom: "10px",
                fontFamily: "monospace",
              }}
            >
              Đăng nhập
            </div>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Hãy nhập tên tài khoản" }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Tài khoản"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Mật khẩu"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Ghi nhớ</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Quên mật khẩu
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Đăng nhập
                </Button>
                <div style={{ float: "right" }}>
                  Hoặc
                  <NavLink to="/register"> Đăng ký!</NavLink>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Row>
      </Layout>
    </>
  );
}
