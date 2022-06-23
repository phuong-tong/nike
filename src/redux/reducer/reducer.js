import { combineReducers } from "redux";
import reducerCart from "../../component/Cart/module/reducer/reducer";
import reducerURL from "../../component/ListProduct/Module/Reducers/reducers";

const rootReducer = combineReducers({
  reducerURL,
  reducerCart,
});
export default rootReducer;
