import React from "react";
// import "../../../Assets/Styles/shedule.scss";

import { useDispatch } from "react-redux";
import { showSheduleOfTeacher } from "../../../Redux/actions";

const OneGroup = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="vertical_item">
      <div
        className="page_item"
        onClick={() => {
          dispatch(showSheduleOfTeacher(props.teacher_lastName));
        }}
      >
        <div className="page_item_descr">
          <p> {props.teacher_lastName}</p>
        </div>
      </div>
    </div>
  );
};

export default OneGroup;
