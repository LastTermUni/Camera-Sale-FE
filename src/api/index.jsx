import axios from "axios";

const URL = "http://localhost:5000";
export const fetchCustomer = () => axios.get(`${URL}/user`);
export const fetchProducts = (id) => axios.get(`${URL}/product`, id);
export const createProduct = (payload) => axios.post(`${URL}/product`,payload);