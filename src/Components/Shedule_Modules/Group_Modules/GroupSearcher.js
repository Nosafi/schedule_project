import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import GroupList from "./GroupList";

import "../../../Assets/Styles/Common/common.scss";
import {
  inputIntroducedData,
  showFilteredGroups,
  loadListOfGroups,
} from "../../../Redux/actions";

const GroupSearcher = (props) => {
  const dispatch = useDispatch();
  const [group, setGroup] = useState("");
  const groupValidation = (e) => {
    setGroup(e.target.value);
    dispatch(inputIntroducedData(e.target.value));
    dispatch(showFilteredGroups());
  };
  useEffect(() => {
    dispatch(loadListOfGroups());
  }, [dispatch]);

  return (
    <div className="container">
      {props.isGroupLoaded ? (
        <>
          <input
            type="text"
            className="brandInput"
            placeholder="Введите номер вашей группу..."
            onChange={groupValidation}
          ></input>

          {group ? <GroupList groups={props.groups} /> : false}
        </>
      ) : (
        false //!добавить loader
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    groups: state.groups_list.filtered_groups,
    isGroupLoaded: state.groups_list.is_loaded,
    isFiltered: state.shedule.isFiltered,
    shedule: state.shedule.shedule,
  };
};

export default connect(mapStateToProps, null)(GroupSearcher);
