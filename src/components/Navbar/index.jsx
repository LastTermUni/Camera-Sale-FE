import React, { useEffect } from "react";
import { Layout, Menu, Col, Row, Button, Space } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import mainLogo from "../../CameraStore.png";
import { NavLink } from "react-router-dom";
const { Header } = Layout;

export const Navbar = () => {
  const state = useSelector((state) => state.handleCart);
  //sticky navgation
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });
  const isSticky = (e) => {
    const header = document.querySelector("#header-section");
    const scrollTop = window.scrollY;
    scrollTop >= 125
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
  };
  //

  
  return (
    <>
      <Layout>
        <Header style={{ zIndex: 10, width: "100%" }} id="header-section">
          <Row>
            <Col span={2} offset={2}>
              <NavLink to="/">
                <img className="logo" src={mainLogo} alt="logo"></img>
              </NavLink>
            </Col>
            <Col span={14} offset={2}>
              <Menu theme="dark" mode="horizontal">
                <Menu.Item key="1" className="menu-selected">
                  <NavLink to="/">Trang chủ</NavLink>
                </Menu.Item>

                <Menu.Item key="2" className="menu-selected">
                  <NavLink to="/san-pham">Sản phẩm</NavLink>
                </Menu.Item>

                <Menu.Item key="3" className="menu-selected">
                  <NavLink to="/thong-tin">Thông tin</NavLink>
                </Menu.Item>
              </Menu>
            </Col>
            <Col span="4">
              <Space>
                <NavLink to={"/gio-hang"}>
                <Button
                  type="link"
                  shape="round"
                  icon={<ShoppingCartOutlined />}
                  size={30}
                  style={{ color: "white", fontSize: "18px" }}
                  >
                  Giỏ hàng ({state.length})
                </Button>
                  </NavLink>
                <Button
                  type="dashed"
                  shape="circle"
                  icon={<UserOutlined />}
                  size={30}
                />
              </Space>
            </Col>
          </Row>
        </Header>
      </Layout>
    </>
  );
};
