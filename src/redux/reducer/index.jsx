import handleCart from "./handleCart";
import { combineReducers } from "redux";
import customerReducers from "./customer";
import modal from "./modal";

const rootReducers = combineReducers({
  handleCart,
  customerReducers,
  modal,
});
export default rootReducers;
