import update from "immutability-helper";
import {
  LOGIN_SUCCESS,
  LOGIN_END,
  SET_ADMIN_DATA,
  UPDATE_ADMIN_GROUP,
  UPDATE_ADMIN_OBJECTS,
  UPDATE_ADMIN_TEACHERS,
  UPDATE_ADMIN_SPECIALTIES,
  UPDATE_ADMIN_FACULTY,
  UPDATE_ADMIN_ROOMS,
  SET_DATA_FLOW,
  UPDATE_ADMIN_BUILDINGS,
} from "../types";

const defaultData = {
  login_check: false,
  data_is_loaded: false,
  user: "test",
  access: "",
  token: "",
  data: {},
};

export const adminReducer = (state = defaultData, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return update(state, {
        login_check: { $set: true },
        user: { $set: action.payload.user },
        access: { $set: action.payload.access },
        token: { $set: action.payload.token },
      });
    case LOGIN_END:
      return update(state, {
        login_check: { $set: false },
        data_is_loaded: { $set: false },
        user: { $set: "" },
        access: { $set: "" },
        token: { $set: "" },
        data: { $set: {} },
      });
    case SET_ADMIN_DATA:
      return update(state, {
        data_is_loaded: { $set: true },
        data: { $set: action.payload },
      });
    case SET_DATA_FLOW:
      return update(state, {
        $merge: { flow: action.payload },
      });
    case UPDATE_ADMIN_GROUP:
      return update(state, {
        data: { groups: { $set: action.payload } },
      });
    case UPDATE_ADMIN_OBJECTS:
      return update(state, {
        data: { disciplines: { $set: action.payload } },
      });
    case UPDATE_ADMIN_TEACHERS:
      return update(state, {
        data: { teachers: { $set: action.payload } },
      });
    case UPDATE_ADMIN_SPECIALTIES:
      return update(state, {
        data: { specialties: { $set: action.payload } },
      });
    case UPDATE_ADMIN_FACULTY:
      return update(state, {
        data: { faculties: { $set: action.payload } },
      });
    case UPDATE_ADMIN_ROOMS:
      return update(state, {
        data: { rooms: { $set: action.payload } },
      });
    case UPDATE_ADMIN_BUILDINGS:
      return update(state, {
        data: { building: { $set: action.payload } },
      });
    default:
      return state;
  }
};
