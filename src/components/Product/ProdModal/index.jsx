import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import {
  Col,
  Layout,
  Row,
  Button,
  Modal,
  Input,
  Tooltip,
  Form,
  Select,
  Switch,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createProduct } from "../../../redux/action";
import { modalState$ } from "../../../redux/selectors";

export function CreateProdModal() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    prodName: "",
    prodPrice: "",
    prodPicture: "",
    prodCate: "",
    prodDesc: "",
  });

  const onSubmit = React.useCallback(async () => {
    console.log({ data });
    dispatch(createProduct.createProductRequest(data));
  }, [data, dispatch]);

  function formatNumber(value) {
    value += "";
    const list = value.split(".");
    const prefix = list[0].charAt(0) === "-" ? "-" : "";
    let num = prefix ? list[0].slice(1) : list[0];
    let result = "";
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ""}`;
  }
  //for image
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const CreateProd = (
    <div>
      <Form>
        <Row gutter={[8, 8]}>
          <Col span={10} style={{ background: "#f7f7f7" }}>
            <div style={{ minHeight: "fit-content", padding: "8px" }}></div>
          </Col>
          <Col span={14} style={{ background: "white", paddingLeft: "20px" }}>
            <div style={{ padding: "8px" }}>
              <Form.Item style={{ margin: "10px" }}>
                <Input
                  value={data.prodName}
                  onChange={(e) =>
                    setData({ ...data, prodName: e.target.value })
                  }
                  placeholder="Tên sản phẩm"
                />
              </Form.Item>
              <Form.Item style={{ margin: "10px" }}>
                <Select
                  placeholder="Loại sản phẩm"
                  onChange={(e) =>
                    setData({
                      ...data,
                      prodCate: e,
                    })
                  }
                >
                  <Select.Option value="demo">Demo</Select.Option>
                  <Select.Option value="camera">Camera</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item style={{ margin: "10px" }}>
                <Input.TextArea
                  placeholder="Mô tả"
                  className="description-product-detail"
                  value={data.prodDesc}
                  onChange={(e) =>
                    setData({ ...data, prodDesc: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item style={{ margin: "10px" }}>
                <Input
                  value={data.prodPrice}
                  onChange={(e) =>
                    setData({ ...data, prodPrice: e.target.value })
                  }
                  placeholder="Giá sản phẩm"
                />
              </Form.Item>
              <Form.Item style={{ margin: "10px" }}>
                <FileBase64
                  accept="image/*"
                  multiple={false}
                  type="file"
                  value={data.prodPicture}
                  onDone={(base64) => {
                    setData({ ...data, prodPicture: base64.base64 });
                  }}
                />
              </Form.Item>
              <Form.Item
                style={{ margin: "10px" }}
                label="Trạng thái"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <div onClick={onSubmit} style={{ float: "right" }}>
                <Button className="btnAdd-product-detail">Thêm sản phẩm</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );

  return (
    <>
      <div>
        <Layout style={{ paddingTop: "20px", background: "rgb(247 247 247)" }}>
          {CreateProd}
        </Layout>
      </div>
    </>
  );
}