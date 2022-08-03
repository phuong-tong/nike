import * as ActionType from "../constants/constants";
import API from "../../../../axios/API";

export const createAction = ({ type, payload }) => {
  return {
    type,
    payload,
  };
};
export const postAPICart = (data, token, history) => {
  return async (dispatch) => {
    try {
      const res = await API("/cart/create", "POST", data, token);
      setTimeout(() => {
        //alert("success");
        localStorage.removeItem("cart");
        history("user/order");
        dispatch(
          createAction({ type: ActionType.ADD_TO_CARD, payload: [] }, 2000)
        );
      });
    } catch (error) {
      alert("Order Fail");
      console.log(...error);
    }
  };
};

export const postFavorAPICart = () => {
  return async () => {
    try {
      const userLocal = JSON.parse(localStorage.getItem("user"));
      const { token } = userLocal;
      const userFavor = JSON.parse(localStorage.getItem("userFavor"));
      //console.log(userFavor);
      if (userFavor === null) {
        const res1 = await API(
          "users/addUpdateFavorite",
          "POST",
          { productsFavorite: [] },
          token
        );
      } else {
        const res2 = await API(
          "users/addUpdateFavorite",
          "POST",
          { productsFavorite: userFavor },
          token
        );
      }
    } catch (error) {
      alert("Add favorite fail");
      console.log(...error);
    }
  };
};
