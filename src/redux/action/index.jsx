import { createAction, createActions } from "redux-actions";

export const getType = (reduxActions) => {
  return reduxActions().type;
};
export const getCustomer = createActions({
  getCustomerRequest: undefined,
  getCustomerSuccess: (payload) => payload,
  getCustomerFailure: (err) => err,
});
export const getProducts = createActions({
  getProductsRequest: undefined,
  getProductsSuccess: (payload) => payload,
  getProductsFailure: (err) => err,
});
export const createProduct = createActions({
  createProductRequest: (payload) => payload,
  createProductSuccess: (payload) => payload,
  createProductFailure: (err) => err,
});
export const showModal = createAction("SHOW_CREATE_POST_MODAL");
export const hideModal = createAction("HIDE_CREATE_POST_MODAL");

export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};
export const delCart = (product) => {
  return {
    type: "DELITEM",
    payload: product,
  };
};
