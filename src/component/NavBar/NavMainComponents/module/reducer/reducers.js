import React from "react";
import * as ActionType from "../constants/constants";

const userLocal = JSON.parse(localStorage.getItem("user"));

let initialState = {
  open: false,
  openSU: false,
  user: userLocal,
  dataAll: [],
  dataSearchList: [],
  dataSuggest: [],
  isAdmin: false,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REDUX:
      state.open = action.data;
      break;
    case ActionType.SIGNUP:
      state.openSU = action.data;
      break;
    case ActionType.LOGOUT:
      state.user = action.payload;
      state.isAdmin = false;
      break;
    case ActionType.FETCH_API_LOGIN:
      state.user = action.payload;
      state.open = false;
      break;
    default:
      break;
  }
  return { ...state };
};

export default reducers;
