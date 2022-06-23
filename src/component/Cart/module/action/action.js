import * as ActionType from "../constants/constants";
import API from "../../../../axios/API";

export const createAction = ({ type, payload }) => {
  return {
    type,
    payload,
  };
};
