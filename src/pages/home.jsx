import React, { useEffect, useState } from "react";
import { Layout, Carousel, Divider, Row, Col, Card, Button } from "antd";
import images from "../api/image";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import NumberFormat from "react-number-format";

const { Content } = Layout;

const bannerStyle = {
  width: "fit-content",
  height: "300px",
  margin: "0 auto",
};
export function Home() {
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
        // "https://fakestoreapi.com/products?limit=10"
        'http://localhost:5000/product'
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

  const Loading = () => {
    return (
      <>
        <div style={{ margin: "16px" }}>
          <Row gutter={[8, 8]} style={{ justifyContent: "center" }}>
            <Col span={4} style={{ margin: "17px" }}>
              <Skeleton width={240} height={380} />
            </Col>
            <Col span={4} style={{ margin: "17px" }}>
              <Skeleton width={240} height={380} />
            </Col>
            <Col span={4} style={{ margin: "17px" }}>
              <Skeleton width={240} height={380} />
            </Col>
            <Col span={4} style={{ margin: "17px" }}>
              <Skeleton width={240} height={380} />
            </Col>
            <Col span={4} style={{ margin: "17px" }}>
              <Skeleton width={240} height={380} />
            </Col>
          </Row>
        </div>
      </>
    );
  };
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
                    loading={loading}
                    bodyStyle={{
                      width: 240,
                      height: 380,
                      padding: 0,
                      borderRadius: "3px",
                    }}
                    className="box-card-list"
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
                          <NumberFormat
                            value={product.price.toFixed(0)}
                            className="priceProduct"
                            thousandSeparator={true}
                            displayType={"text"}
                            renderText={(value, props) => (
                              <div {...props}>{value} VNĐ</div>
                            )}
                          />
                        </div>
                      </NavLink>
                    </div>
                    <div style={{ textAlign: "center" }}>
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
          <Row gutters={20}>{loading ? <Loading /> : <ShowProducts />}</Row>
        </Content>
      </Layout>
    </>
  );
}
