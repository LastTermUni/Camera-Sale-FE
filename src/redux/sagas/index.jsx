//generator es6
import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../action";
import * as api from "../../api";

function* fetchCustomerSaga(action) {
  const customer = yield call(api.fetchCustomer);
  console.log("[customer]", customer);
  yield put(actions.getCustomer.getCustomerSuccess(customer.data));
}
function* fetchProductSaga(action) {
  try {
    const product = yield call(api.fetchProducts);
    console.log("[product]", product);
    yield put(actions.getProducts.getProductsSuccess(product.data));
  } catch (error) {
    console.error(error);
    yield put(actions.getProducts.getProductsFailure(err));
  }
}
function* createProductSaga(action) {
  try {
    const product = yield call(api.createProduct, action.payload);
    console.log("[createProductSaga- product]", product);
    yield put(actions.createProduct.createProductSuccess(product.data));
  } catch (error) {
    console.error(error);
    yield put(actions.createProduct.createProductFailure(error));
  }
}
function* mySaga() {
  yield takeLatest(actions.getCustomer.getCustomerRequest, fetchCustomerSaga);
  yield takeLatest(
    actions.createProduct.createProductRequest,
    createProductSaga
  );
}
export default mySaga;
