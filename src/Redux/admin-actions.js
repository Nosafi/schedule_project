import {
  LOGIN_IS_CLICKED,
  LOGIN_END,
  ADMIN_IS_LOADING,
  CREATE_NEW_DATA,
  DELETE_FROM_API,
  EDIT_OPERATION_API,
  UPDATE_SHEDULE_IN_BD,
  NEW_TABLE_IN_BD,
} from "./types";

export function enterButtonClicker(login, password) {
  return {
    type: LOGIN_IS_CLICKED,
    payload: {
      login,
      password,
    },
  };
}

export function loadDataForAdmin() {
  return {
    type: ADMIN_IS_LOADING,
  };
}

export function exiteFromAdminPage() {
  return {
    type: LOGIN_END,
  };
}

export function createNewData(table_name, data) {
  return {
    type: CREATE_NEW_DATA,
    payload: {
      table_name,
      data,
    },
  };
}

export function deleteFromApi(data) {
  return {
    type: DELETE_FROM_API,
    payload: data,
  };
}

export function editOperation(table_name, data) {
  return {
    type: EDIT_OPERATION_API,
    payload: { table_name, data },
  };
}

export function newTableToBD(data) {
  console.log(data);
  return {
    type: NEW_TABLE_IN_BD,
    payload: {
      table: "titles",
      data,
    },
  };
}

export function onSaveButton(data) {
  return {
    type: UPDATE_SHEDULE_IN_BD,
    payload: data,
  };
}
