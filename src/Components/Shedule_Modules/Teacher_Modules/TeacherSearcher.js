import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import TecherList from "./TecherList";

import {
  inputIntroducedTeacher,
  showFilteredTeachers,
  loadListOfTeachers,
} from "../../../Redux/actions";

const TeacherSearcher = (props) => {
  const dispatch = useDispatch();
  const [teacher, setTeacher] = useState("");
  const teacherValidation = (e) => {
    setTeacher(e.target.value);
    dispatch(inputIntroducedTeacher(e.target.value));
    dispatch(showFilteredTeachers());
  };
  useEffect(() => {
    dispatch(loadListOfTeachers());
  }, [dispatch]);

  return (
    <>
      {props.isTeachersLoaded ? (
        <>
          <input
            type="text"
            className="brandInput"
            placeholder="Введите фамилию..."
            onChange={teacherValidation}
          ></input>

          {teacher ? <TecherList teachers={props.teachers} /> : false}
        </>
      ) : (
        false //!добавить loader
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    teachers: state.teachers.filtered_teachers,
    isTeachersLoaded: state.teachers.is_loaded,
  };
};

export default connect(mapStateToProps, null)(TeacherSearcher);
