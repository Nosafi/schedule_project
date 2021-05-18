import update from "immutability-helper";
import {
  SET_TEACHERS,
  SET_ENTERED_TEACHER,
  SHOW_FILTERED_TEACHERS,
  CLEAR_TEACHER_SELECTED,
} from "../types";

const defaultData = {
  is_loaded: false,
  teachers_list: [],
  curr_teacher: "",
  filtered_teachers: [],
};

export const teachersReducer = (state = defaultData, action) => {
  function teacher_Search(data, filtered) {
    let data_mass = data.toLowerCase().split("");
    let filtered_mass = filtered.toLowerCase().split("");

    for (let index = 0; index < data_mass.length; index++) {
      if (data_mass[index] !== filtered_mass[index]) return false;
    }
    return true;
  }

  switch (action.type) {
    case SET_TEACHERS:
      return update(state, {
        teachers_list: { $set: action.payload },
        is_loaded: { $set: true },
      });
    case SET_ENTERED_TEACHER:
      return update(state, { curr_teacher: { $set: action.payload } });
    case SHOW_FILTERED_TEACHERS:
      if (state.curr_teacher.toString() === "") {
        return update(state, {
          filtered_teachers: { $set: [] },
        });
      } else {
        return update(state, {
          filtered_teachers: {
            $set: state.teachers_list.filter((element) => {
              if (
                teacher_Search(
                  state.curr_teacher.toString(),
                  element.Teacher_lastName.toString()
                ) === true
              ) {
                return element.Teacher_lastName;
              }
            }),
          },
        });
      }
    case CLEAR_TEACHER_SELECTED:
      return update(state, { filtered_teachers: { $set: [] } });
    default:
      return state;
  }
};
