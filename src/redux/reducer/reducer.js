import { combineReducers } from "redux";
import reducerCart from "../../component/Cart/module/reducer/reducer";
import reducerURL from "../../component/ListProduct/Module/Reducers/reducers";
import reducerSignInSignUp from "../../component/NavBar/NavMainComponents/module/reducer/reducers";
const rootReducer = combineReducers({
  reducerURL,
  reducerCart,
  reducerSignInSignUp,
});
export default rootReducer;
