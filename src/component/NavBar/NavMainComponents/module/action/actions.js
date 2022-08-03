import * as ActionType from "../constants/constants";
import API from "../../../../../axios/API";

export const emitOpenAction = (open) => {
  return {
    type: ActionType.REDUX,
    data: open,
  };
};

export const emitOpenSignUp = (openSU) => {
  console.log(openSU);
  return {
    type: ActionType.SIGNUP,
    data: openSU,
  };
};

export const createAction = ({ type, payload }) => {
  return {
    type,
    payload,
  };
};

export const fetchApiLoginUser = (data) => {
  return async (dispatch) => {
    try {
      const res = await API("users/login", "POST", data);
      dispatch(
        createAction({
          type: ActionType.FETCH_API_LOGIN,
          payload: res.data,
        })
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      alert(res.data.messager);

      const userLocal = JSON.parse(localStorage.getItem("user"));
      const favorLocal = userLocal?.user.productsFavorite;
      localStorage.setItem("userFavor", JSON.stringify(favorLocal));
    } catch (error) {
      alert("Login Fail");
    }
  };
};
