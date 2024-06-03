import { combineReducers } from "redux";
import authSlice from "../slices/authSlice";
import invoiceSlic from "../slices/invoiceSlic";


const rootReducer = combineReducers({
  auth : authSlice,
  invoice : invoiceSlic
})

export default rootReducer;