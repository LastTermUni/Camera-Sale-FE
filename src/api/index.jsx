import axios from "axios";

const URL = "http://localhost:5000";
export const fetchCustomer = () => axios.get(`${URL}/user`);
export const fetchProducts = () => axios.get(`${URL}/product`);
export const createProduct = (payload) => axios.post(`${URL}/product`,payload);