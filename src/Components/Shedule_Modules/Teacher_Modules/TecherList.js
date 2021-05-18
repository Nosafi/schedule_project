import React from "react";
import "../../../Assets/Styles/Common/common.scss";
import "../../../Assets/Styles/Middle-garde/group_schedules.scss";
import OneTeacher from "./OneTeacher";

const TeacherList = (props) => {
  return (
    <div className="list_holder">
      <div className="vertical_container">
        {props.teachers.map((element) => {
          return (
            <OneTeacher
              key={element.Teacher_id}
              teacher_lastName={element.Teacher_lastName}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TeacherList;
