import React from "react";
import "../../../Assets/Styles/Common/common.scss";
import { useDispatch } from "react-redux";
import { showSheduleOfGroup } from "../../../Redux/actions";
import GroupSchedule from "./SheduleTableByGroup";
const OneGroup = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="vertical_item">
      <div
        className="page_item"
        onClick={() => {
          dispatch(showSheduleOfGroup(props.group_number));
        }}
      >
        <div className="page_item_descr">
          <p>{props.group_number}</p>
        </div>
      </div>
    </div>
  );
};

export default OneGroup;
