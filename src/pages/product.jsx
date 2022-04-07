import { Col, Layout, Row, Button } from "antd";
import NumberFormat from "react-number-format";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";

export function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      setProduct(await response.json());
      setLoading(false);
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <Row gutter={[8, 8]}>
          <Col span={14}>
            <div style={{ minHeight: "100vh", padding: "8px" }}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Skeleton height={400} width={418} />
                </Col>
                <Col span={12}>
                  <Skeleton height={400} width={418} />
                </Col>
                <Col span={12}>
                  <Skeleton height={400} width={418} />
                </Col>
                <Col span={12}>
                  <Skeleton height={400} width={418} />
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={10} style={{ background: "white" }}>
            <div style={{ padding: "8px" }}>
              <Skeleton height={50} width={500} />
              <Skeleton height={50} width={200} />
              <Skeleton height={200} width={500} />
              <div className="price-product-detail">
                <Skeleton height={50} width={200} />
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  };
  const ShowProduct = () => {
    return (
      <div>
        <Row gutter={[8, 8]}>
          <Col span={14} style={{ background: "#f7f7f7" }}>
            <div style={{ minHeight: "100vh", padding: "8px" }}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <div
                    style={{
                      height: "400px",
                      width: "418px",
                      textAlign: "center",
                    }}
                  >
                    <img
                      style={{
                        height: "400px",
                        width: "418px",
                        objectFit: "contain",
                      }}
                      src={product.image}
                      alt={product.title}
                    ></img>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={10} style={{ background: "white", paddingLeft: "20px" }}>
            <div style={{ padding: "8px" }}>
              <div className="title-product-detail">{product.title}</div>
              <div className="category-product-detail">
                Loại: {product.category}
              </div>
              <div className="description-product-detail">
                {product.description}
              </div>

              <NumberFormat
                value={product.price}
                className="price-product-detail"
                thousandSeparator={true}
                displayType={"text"}
                renderText={(value, props) => <div {...props}>{value} VNĐ</div>}
              />
              <Button
                className="btnAdd-product-detail"
                onClick={() => addProduct(product)}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <>
      <div>
        <Layout style={{ paddingTop: "20px", background: "rgb(247 247 247)" }}>
          {loading ? <Loading /> : <ShowProduct />}
        </Layout>
      </div>
    </>
  );
}
