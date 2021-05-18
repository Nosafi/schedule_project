import { combineReducers } from "redux";

import { scheduleReducer } from "./Reducers/scheduleReducer";
import { groupsReducer } from "./Reducers/groupsReducer";
import { searchSchedulesReducer } from "./Reducers/searchSchedulesReducer";
import { teachersReducer } from "./Reducers/teachersReducer";

//only admin reducers
import { adminReducer } from "./Reducers/adminReducer";

export const rootReducer = combineReducers({
  schedule: scheduleReducer,
  groups_list: groupsReducer,
  schedulesSearch: searchSchedulesReducer,
  teachers: teachersReducer,
  admin: adminReducer,
});
