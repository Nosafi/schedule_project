import {
  LOAD_SHEDULE_FROM_API,
  LOAD_GROUPS_FROM_API,
  LOAD_TEACHERS_FROM_API,
  SET_ENTERED_TEACHER,
  SHOW_FILTERED_TEACHERS,
  SET_ENTERED_GROUP,
  SHOW_FILTERED_GROUPS,
  SEARCHED_GROUP_SELECTED,
  SEARCHED_TEACHER_SELECTED,
  CLEAR_GROUP_SELECTED,
  SET_DATA_FLOW,
  SEARCHED_DAY_SELECTED,
  LOAD_DATA_FOR_SEARCH_FROM_API,
} from "./types";

export function loadListOfGroups() {
  return {
    type: LOAD_GROUPS_FROM_API,
  };
}

export function loadShedule() {
  return {
    type: LOAD_SHEDULE_FROM_API,
  };
}

export function inputIntroducedData(data) {
  return {
    type: SET_ENTERED_GROUP,
    payload: data,
  };
}

export function inputIntroducedTeacher(data) {
  return {
    type: SET_ENTERED_TEACHER,
    payload: data,
  };
}

export function showFilteredGroups() {
  return {
    type: SHOW_FILTERED_GROUPS,
  };
}

export function showFilteredTeachers() {
  return {
    type: SHOW_FILTERED_TEACHERS,
  };
}
export function showDayFilter(id) {
  return {
    type: SEARCHED_DAY_SELECTED,
    payload: id,
  };
}
export function loadDataFromApi() {
  return {
    type: LOAD_DATA_FOR_SEARCH_FROM_API,
  };
}
export function showSheduleOfGroup(group_num) {
  return {
    type: SEARCHED_GROUP_SELECTED,
    payload: group_num,
  };
}

export function showSheduleOfTeacher(familiya) {
  return {
    type: SEARCHED_TEACHER_SELECTED,
    payload: familiya,
  };
}

export function backToGroupFilter() {
  return {
    type: CLEAR_GROUP_SELECTED,
  };
}

export function loadListOfTeachers() {
  return {
    type: LOAD_TEACHERS_FROM_API,
  };
}

// DataFlow
export const putFlow = (data) => {
  return { type: SET_DATA_FLOW, payload: data };
};
