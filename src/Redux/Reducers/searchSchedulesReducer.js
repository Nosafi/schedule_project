import update from "immutability-helper";
import { SET_DATA_FOR_SEARCH } from "../types";

const searchSchedulesData = {
  response: [],
};

export const searchSchedulesReducer = (state = searchSchedulesData, action) => {
  switch (action.type) {
    case SET_DATA_FOR_SEARCH:
      return update(state, {
        response: { $set: action.payload },
      });
    default:
      return state;
  }
};
