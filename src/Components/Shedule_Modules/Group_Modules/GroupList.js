import React from "react";

import OneGroup from "./OneGroup";
import "../../../Assets/Styles/Common/common.scss";
import "../../../Assets/Styles/Middle-garde/group_schedules.scss";
const GroupList = (props) => {
  return (
    <div className="list_holder">
      <div className="vertical_container">
        {props.groups.map((element) => {
          return (
            <OneGroup
              key={element.Group_id}
              group_number={element.Group_Number}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GroupList;
