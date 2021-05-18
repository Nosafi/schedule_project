import update from "immutability-helper";
import {
  SET_SHEDULE,
  SEARCHED_GROUP_SELECTED,
  SEARCHED_TEACHER_SELECTED,
  CLEAR_GROUP_SELECTED,
  SEARCHED_DAY_SELECTED,
} from "../types";

const defaultData = {
  schedule: [],
  filterKey: "",
  filteredSchedule: [],
  isFiltered: false,
  filteredShedule: [],
  filteredByDayShedule: [],
};

export const scheduleReducer = (state = defaultData, action) => {
  switch (action.type) {
    case SET_SHEDULE:
      return update(state, {
        schedule: {
          $set: action.payload.sort((a, b) => (a.Time > b.Time ? 1 : -1)),
        },
        is_loaded: { $set: true },
      });
    case SEARCHED_GROUP_SELECTED:
      return update(state, {
        filterKey: { $set: action.payload },
        filteredSchedule: {
          $set: state.schedule.filter(
            (schedule) => schedule.group === action.payload
          ),
        },
      });

    case SEARCHED_TEACHER_SELECTED:
      return update(state, {
        filterKey: { $set: action.payload },
        filteredSchedule: {
          $set: state.schedule.filter(
            (schedule) => schedule.teacher.split(" ")[0] === action.payload
          ),
        },
      });
    case CLEAR_GROUP_SELECTED:
      return update(state, {
        isFiltered: { $set: false },
        filteredByDayShedule: {
          $set: [],
        },
      });
    default:
      return state;
  }
};
