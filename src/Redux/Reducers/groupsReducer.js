import update from "immutability-helper";
import {
  SET_GROUPS,
  SET_ENTERED_GROUP,
  SHOW_FILTERED_GROUPS,
  CLEAR_GROUP_SELECTED,
} from "../types";

const defaultData = {
  is_loaded: false,
  group_list: [],
  curr_group: "",
  filtered_groups: [],
};

export const groupsReducer = (state = defaultData, action) => {
  function group_Search(data, filtered) {
    for (let i = 0; i < data.length; i++) {
      if (data.toString().split("")[i] !== filtered.toString().split("")[i])
        return false;
    }
    return true;
  }

  switch (action.type) {
    case SET_GROUPS:
      return update(state, {
        group_list: { $set: action.payload },
        is_loaded: { $set: true },
      });
    case SET_ENTERED_GROUP:
      return update(state, {
        curr_group: { $set: action.payload },
      });
    case SHOW_FILTERED_GROUPS:
      if (state.curr_group.toString() === "") {
        return update(state, {
          filtered_groups: { $set: [] },
        });
      } else {
        return update(state, {
          filtered_groups: {
            $set: state.group_list.filter((element) => {
              if (
                group_Search(state.curr_group, element.Group_Number) === true
              ) {
                return element.Group_Number;
              }
            }),
          },
        });
      }
    case CLEAR_GROUP_SELECTED:
      return update(state, {
        filtered_groups: { $set: [] },
      });
    default:
      return state;
  }
};
