import React, { useEffect, useState } from "react";
import { Layout, Carousel, Divider, Row, Col, Card, Button } from "antd";
import images from "../api/image";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../../redux/action";

const { Content } = Layout;

const bannerStyle = {
  width: "fit-content",
  height: "300px",
  margin: "0 auto",
};
export const Home = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch(
        "https://fakestoreapi.com/products?limit=10"
      );
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

  const ShowProducts = () => {
    return (
      <>
        <Row gutters={16} style={{ justifyContent: "center" }}>
          {filter.map((product) => {
            return (
              <div key={product.id}>
                <Col span={5} style={{ margin: "10px" }}>
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    loading={loading}
                    bodyStyle={{
                      width: 240,
                      height: 380,
                      padding: 0,
                      border: "1px solid #a7a5a5",
                      borderRadius: "3px",
                    }}
                  >
                    <div style={{ height: "320px" }}>
                      <NavLink to={`/san-pham/${product.id}`}>
                        <img
                          style={{
                            width: "100%",
                            height: "240px",
                            padding: "5px",
                          }}
                          src={product.image}
                          alt={product.title}
                        />
                        <div>
                          <div className="titleProduct">{product.title}</div>

                          <div className="priceProduct"> {product.price}</div>
                        </div>
                      </NavLink>
                    </div>
                    <div style={{ margin: "10px", border: "1px solid black" }}>
                      <Button
                        onClick={() => addProduct(product)}
                        className="btnCart"
                      >
                        <FontAwesomeIcon icon={faCartPlus} size="2x" />
                        Thêm vào giỏ
                      </Button>
                    </div>
                  </Card>
                </Col>
              </div>
            );
          })}
        </Row>
      </>
    );
  };
  return (
    <>
      <Layout>
        <Content>
          <Carousel effect="fade" autoplay>
            {images.map(({ src }) => {
              return (
                <div key={src}>
                  <div>
                    <div style={{ background: "black" }}>
                      <img style={bannerStyle} src={src} alt="banner" />
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
          <Divider orientation="center">Sản phẩm mới nhất</Divider>
          <Row gutters={20}>
            <ShowProducts />
          </Row>
        </Content>
      </Layout>
    </>
  );
};
