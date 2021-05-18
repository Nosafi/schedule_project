import { takeEvery, put, call } from "redux-saga/effects";

import {
  LOAD_SHEDULE_FROM_API,
  LOAD_DATA_FOR_SEARCH_FROM_API,
  SET_DATA_FOR_SEARCH,
  SET_SHEDULE,
  LOAD_GROUPS_FROM_API,
  SET_GROUPS,
  SET_TEACHERS,
  LOAD_TEACHERS_FROM_API,
  LOGIN_IS_CLICKED,
  LOGIN_SUCCESS,
  ADMIN_IS_LOADING,
  SET_ADMIN_DATA,
  CREATE_NEW_DATA,
  DELETE_FROM_API,
  UPDATE_ADMIN_GROUP,
  UPDATE_ADMIN_OBJECTS,
  UPDATE_ADMIN_TEACHERS,
  UPDATE_ADMIN_SPECIALTIES,
  UPDATE_ADMIN_FACULTY,
  UPDATE_ADMIN_ROOMS,
  EDIT_OPERATION_API,
  UPDATE_SHEDULE_IN_BD,
  UPDATE_ADMIN_BUILDINGS,
  NEW_TABLE_IN_BD,
} from "./types";
import nconf from "../CONFIG.json";

export function* sagaWatcher() {
  yield takeEvery(LOAD_SHEDULE_FROM_API, loadSheduleFromApi);
  yield takeEvery(LOAD_GROUPS_FROM_API, loadGroupsFromApi);
  yield takeEvery(LOAD_DATA_FOR_SEARCH_FROM_API, loadDataForUser);
  yield takeEvery(LOAD_TEACHERS_FROM_API, loadTeachersFromApi);
  //admin watchers
  yield takeEvery(LOGIN_IS_CLICKED, authValidation);

  yield takeEvery(ADMIN_IS_LOADING, loadDataForAdministrator);
  yield takeEvery(CREATE_NEW_DATA, createNewDataToAPI);
  yield takeEvery(EDIT_OPERATION_API, editSendToAPI);
  yield takeEvery(DELETE_FROM_API, deleteFromApi);
  yield takeEvery(UPDATE_SHEDULE_IN_BD, newSheduleToApi);
  yield takeEvery(NEW_TABLE_IN_BD, newNameTableToApi);
}

async function fetch_from_api(url, params) {
  const response = await fetch(url, params);
  return await response.json();
}

function* loadGroupsFromApi() {
  let new_data = yield call(fetch_from_api, nconf.api_url + "/groups/");

  yield put({
    type: SET_GROUPS,
    payload: new_data.response,
  });
}

function* loadTeachersFromApi() {
  let new_data = yield call(fetch_from_api, nconf.api_url + "/teachers/");

  yield put({
    type: SET_TEACHERS,
    payload: new_data.response,
  });
}

function* loadSheduleFromApi() {
  console.log(nconf.api_url + "/schedules/view");
  let new_data = yield call(fetch_from_api, nconf.api_url + "/schedules/view");

  yield put({
    type: SET_SHEDULE,
    payload: new_data.response,
  });
}
//! ------------ auth
function* authValidation(payload) {
  let authURL = yield call(fetch_from_api, nconf.api_url + "/user/auth/", {
    method: "post",
    body: JSON.stringify(payload.payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (authURL.response) {
    yield put({
      type: LOGIN_SUCCESS,
      payload: {
        token: authURL.response,
      },
    });
  } else {
    alert("Неверный логин или пароль!");
  }
}
//! ------------ auth

//для начальной страницы, с помощью этого происходит поиск расписания
function* loadDataForUser() {
  const [
    specialties_for_search,
    department_for_search,
    faculties_for_search,
    groups_for_search,
    teachers_for_search,
  ] = [
    yield call(fetch_from_api, nconf.api_url + "/specialties/"),
    yield call(fetch_from_api, nconf.api_url + "/departments/"),
    yield call(fetch_from_api, nconf.api_url + "/faculties/"),
    yield call(fetch_from_api, nconf.api_url + "/groups/"),
    yield call(fetch_from_api, nconf.api_url + "/teachers/"),
  ];
  const dataForSearch = {
    specialties: specialties_for_search.response,
    department: department_for_search.response,
    faculties: faculties_for_search.response,
    groups: groups_for_search.response,
    teachers: teachers_for_search.response,
  };
  yield put({
    type: SET_DATA_FOR_SEARCH,
    payload: dataForSearch,
  });
}

function* loadDataForAdministrator() {
  let new_data = {};
  let new_data_days_detail = yield call(
    fetch_from_api,
    nconf.api_url + "/days/"
  );
  let new_data_lesson_time = yield call(
    fetch_from_api,
    nconf.api_url + "/time/"
  );

  let new_data_schedule = yield call(
    fetch_from_api,
    nconf.api_url + "/schedules/"
  );

  let new_data_groups = yield call(fetch_from_api, nconf.api_url + "/groups/");
  let new_data_teachers = yield call(
    fetch_from_api,
    nconf.api_url + "/teachers/"
  );
  let new_data_disciplines = yield call(
    fetch_from_api,
    nconf.api_url + "/disciplines/"
  );
  let new_data_specialties = yield call(
    fetch_from_api,
    nconf.api_url + "/specialties/"
  );
  let new_data_faculty = yield call(
    fetch_from_api,
    nconf.api_url + "/faculties/"
  );
  let new_data_department = yield call(
    fetch_from_api,
    nconf.api_url + "/departments/"
  );
  let new_data_discipline_type = yield call(
    fetch_from_api,
    nconf.api_url + "/disciplines/types/"
  );
  let new_data_rooms = yield call(
    fetch_from_api,
    nconf.api_url + "/audiences/"
  );
  let new_building = yield call(fetch_from_api, nconf.api_url + "/addresses/");
  let new_list_of_tables = yield call(
    fetch_from_api,
    nconf.api_url + "/schedules/titles/"
  );
  let new_repeatability = yield call(
    fetch_from_api,
    nconf.api_url + "/repeatability/"
  );

  new_data = {
    schedule: new_data_schedule.response,
    lesson_time: new_data_lesson_time.response,
    days: new_data_days_detail.response,
    groups: new_data_groups.response,
    teachers: new_data_teachers.response,
    disciplines: new_data_disciplines.response,
    disciplines_types: new_data_discipline_type.response,
    specialties: new_data_specialties.response,
    faculties: new_data_faculty.response,
    department: new_data_department.response,
    rooms: new_data_rooms.response,
    building: new_building.response,
    list_of_names: new_list_of_tables.response,
    repeatability: new_repeatability.response,
  };
  yield put({
    type: SET_ADMIN_DATA,
    payload: new_data,
  });
}

function* createNewDataToAPI(payload) {
  let new_data = yield call(
    fetch_from_api,
    nconf.api_url + "/admin/add/newdata/" + JSON.stringify(payload.payload)
  );
  switch (payload.payload.table_name) {
    case "groups_table":
      yield put({
        type: UPDATE_ADMIN_GROUP,
        payload: new_data.response,
      });
      break;
    case "objects_table":
      yield put({
        type: UPDATE_ADMIN_OBJECTS,
        payload: new_data.response,
      });
      break;
    case "teachers_table":
      yield put({
        type: UPDATE_ADMIN_TEACHERS,
        payload: new_data.response,
      });
      break;
    case "specialties_table":
      yield put({
        type: UPDATE_ADMIN_SPECIALTIES,
        payload: new_data.response,
      });
      break;
    case "faculties_table":
      yield put({
        type: UPDATE_ADMIN_FACULTY,
        payload: new_data.response,
      });
      break;
    case "rooms_table":
      yield put({
        type: UPDATE_ADMIN_ROOMS,
        payload: new_data.response,
      });
      break;
    case "building_table":
      yield put({
        type: UPDATE_ADMIN_BUILDINGS,
        payload: new_data.response,
      });
      break;
    default:
      break;
  }
}

function* editSendToAPI(payload) {
  let new_data = yield call(
    fetch_from_api,
    nconf.api_url + "/admin/edit/" + JSON.stringify(payload.payload)
  );

  switch (payload.payload.table_name) {
    case "groups_table":
      yield put({
        type: UPDATE_ADMIN_GROUP,
        payload: new_data.response,
      });
      break;
    case "objects_table":
      yield put({
        type: UPDATE_ADMIN_OBJECTS,
        payload: new_data.response,
      });
      break;
    case "teachers":
      yield put({
        type: UPDATE_ADMIN_TEACHERS,
        payload: new_data.response,
      });
      break;
    case "specialties_table":
      yield put({
        type: UPDATE_ADMIN_SPECIALTIES,
        payload: new_data.response,
      });
      break;
    case "faculties_table":
      yield put({
        type: UPDATE_ADMIN_FACULTY,
        payload: new_data.response,
      });
      break;
    case "rooms_table":
      yield put({
        type: UPDATE_ADMIN_ROOMS,
        payload: new_data.response,
      });
      break;
    case "building_table":
      yield put({
        type: UPDATE_ADMIN_BUILDINGS,
        payload: new_data.response,
      });
      break;
    default:
      break;
  }
}

function* deleteFromApi(payload) {
  let new_data = yield call(
    fetch_from_api,
    nconf.api_url + "/admin/delete/" + JSON.stringify(payload.payload)
  );
  switch (payload.payload.table) {
    case "groups_table":
      yield put({
        type: UPDATE_ADMIN_GROUP,
        payload: new_data.response,
      });
      break;
    case "objects_table":
      yield put({
        type: UPDATE_ADMIN_OBJECTS,
        payload: new_data.response,
      });
      break;
    case "specialties_table":
      yield put({
        type: UPDATE_ADMIN_SPECIALTIES,
        payload: new_data.response,
      });
      break;
    case "faculties_table":
      yield put({
        type: UPDATE_ADMIN_FACULTY,
        payload: new_data.response,
      });
      break;
    case "rooms_table":
      yield put({
        type: UPDATE_ADMIN_ROOMS,
        payload: new_data.response,
      });
      break;
    case "building_table":
      yield put({
        type: UPDATE_ADMIN_BUILDINGS,
        payload: new_data.response,
      });
      break;
    default:
      break;
  }
}

function* newSheduleToApi(payload) {
  console.log(payload.payload);
  let authURL = yield call(fetch_from_api, nconf.api_url + "/schedules/flow", {
    method: "post",
    body: JSON.stringify(payload.payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function* newNameTableToApi(payload) {
  console.log(typeof payload.payload);
  let new_data = yield call(fetch_from_api, nconf.api_url + "/new/", {
    method: "post",
    body: JSON.stringify(payload.payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
