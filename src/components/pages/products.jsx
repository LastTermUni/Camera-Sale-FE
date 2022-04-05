import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Col, Layout, Row } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/action";
import NumberFormat from "react-number-format";

export default function Products() {
  const [data, setData] = useState([]);
  const [dataCate, setDataCate] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const responses = await fetch(
        "https://fakestoreapi.com/products/categories"
      );

      if (componentMounted) {
        setData(await response.clone().json());
        setDataCate(await responses.json());
        setFilter(await response.json());
        setLoading(false);
      }
      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);
  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };
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

  const FilterProducts = (cate) => {
    const updateProducts = data.filter((x) => x.category === cate);
    setFilter(updateProducts);
  };

  const ShowProducts = () => {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button style={{ margin: "0 5px" }} onClick={() => setFilter(data)}>
            Tất cả
          </Button>
          {dataCate.map((cate, index) => {
            return (
              <div key={index}>
                <Button
                  style={{ margin: "0 5px" }}
                  onClick={() => FilterProducts(cate)}
                >
                  {cate}
                </Button>
              </div>
            );
          })}
        </div>

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
      <Layout style={{ background: "white" }}>
        <div style={{ margin: "0 auto" }}>
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </Layout>
    </>
  );
}
